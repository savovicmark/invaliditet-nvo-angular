import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Korisnik } from 'src/app/Models/korisnik.model';
import { AdminState } from '../admin.reducers';
import { Store, select } from '@ngrx/store';
import { SearchService } from 'src/app/services/search.service';
import { filter, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { InvaliditetChangeAction, ObrazovanjeChangeAction, ZaposlenjeChangeAction, SposobnostChangeAction } from '../admin.actions';
import { selectInvaliditet, selectZaposlenje, selectSposobnost, selectObrazovanje } from '../admin.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-korisnik-sort',
  templateUrl: './korisnik-sort.component.html',
  styleUrls: ['./korisnik-sort.component.scss']
})
export class KorisnikSortComponent implements OnInit, OnDestroy {
  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  sub4$: Subscription;
  invalidities = [
    'fizicki invaliditet',
    'senzorni invaliditet',
    'intelektualni invaliditet',
    'mentalni invaliditet',
    'psihosocijalni invaliditet'
  ];
  invalidity = new FormControl('');
  capability = ['puna', 'ogranicena', 'oduzeta'];
  sposobnost = new FormControl('');
  educations = ['bez obrazovanja', 'osnovno', 'srednje', 'vise', 'visoko', 'magistar', 'doktor nauka'];
  obrazovanje = new FormControl('');
  employments = [
    'zaposlen/a',
    'nezaposlen/a',
    'na skolovanju',
    'dijete mladje od skolskog uzrasta',
    'penzioner/ka'
  ];
  zaposlenje = new FormControl('');
  korisnici: Korisnik[];
  korisnikCount: {count: number};

  constructor(private store: Store<AdminState>,
              private searchService: SearchService) { }

  ngOnInit() {
    this.invalidity.valueChanges.pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      tap(value => this.store.dispatch(new InvaliditetChangeAction(value)))
    ).subscribe();
    this.obrazovanje.valueChanges.pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      tap(value => this.store.dispatch(new ObrazovanjeChangeAction(value)))
    ).subscribe();
    this.zaposlenje.valueChanges.pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      tap(value => this.store.dispatch(new ZaposlenjeChangeAction(value)))
    ).subscribe();
    this.sposobnost.valueChanges.pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      tap(value => this.store.dispatch(new SposobnostChangeAction(value)))
    ).subscribe();
    this.sub1$ = this.store.pipe(
      select(selectInvaliditet),
      distinctUntilChanged(),
      switchMap(inval => this.searchService.searchKorisnikByInvaliditet(inval))
    ).subscribe(korisnici => this.korisnici = korisnici);
    this.sub2$ = this.store.pipe(
      select(selectZaposlenje),
      distinctUntilChanged(),
      switchMap(zap => this.searchService.searchKorisnikByZaposlenje(zap))
    ).subscribe(korisnici => this.korisnici = korisnici);
    this.sub3$ = this.store.pipe(
      select(selectSposobnost),
      distinctUntilChanged(),
      switchMap(spos => this.searchService.searchKorisnikBySposobnost(spos))
    ).subscribe(korisnici => this.korisnici = korisnici);
    this.sub4$ = this.store.pipe(
      select(selectObrazovanje),
      distinctUntilChanged(),
      switchMap(obraz => this.searchService.searchKorisnikByObrazovanje(obraz))
    ).subscribe(korisnici => this.korisnici = korisnici);
    this.searchService.getKorisnikCount().subscribe(count => this.korisnikCount = count);
  }

  ngOnDestroy() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
    this.sub3$.unsubscribe();
    this.sub4$.unsubscribe();
  }

}

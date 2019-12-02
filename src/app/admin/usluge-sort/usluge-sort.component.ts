import { Component, OnInit, OnDestroy } from '@angular/core';
import { UslugaService } from 'src/app/services/usluga.service';
import { FormControl } from '@angular/forms';
import { filter, map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminState } from '../admin.reducers';
import { Store, select } from '@ngrx/store';
import { PitanjePomocChangedAction, VrstaPomocChangedAction } from '../admin.actions';
import { of, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { UslugaModel, KorisnikUsluga, KorespondencijaModel } from 'src/app/Models/usluga.model';
import { selectPitanjePomoc, selectVrstaPomoc } from '../admin.selectors';
import { PitanjeZaKojeJeTrazenaPomoc } from 'src/app/Models/pitanja.model';

@Component({
  selector: 'app-usluge-sort',
  templateUrl: './usluge-sort.component.html',
  styleUrls: ['./usluge-sort.component.scss']
})
export class UslugeSortComponent implements OnInit, OnDestroy {
  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  pitanja: PitanjeZaKojeJeTrazenaPomoc[];
  uslugaCount: {count: number};
  pitanjeZaKojeJeTrazenaPomoc = new FormControl('');
  oblikPruzenePomoci = new FormControl('');
  bespPomoc = ['pravno obavjestenje', 'pravni savjet', 'zastupanje', 'posredovanje/medijacija'];
  socZast = ['personalna asistencija', 'pomoc u kuci', 'savjetodavno-terapijske'];
  usluge: UslugaModel[];

  constructor(private uslugaService: UslugaService,
              private store: Store<AdminState>,
              private searchService: SearchService) { }

  ngOnInit() {
    this.uslugaService.getVrstePomoci().subscribe(vrste => {
      this.pitanja = vrste;
    });
    this.uslugaService.getUslugaCount().subscribe(count => this.uslugaCount = count);
    this.pitanjeZaKojeJeTrazenaPomoc.valueChanges.pipe(
      distinctUntilChanged(),
      filter(value => !!value),
      tap(value => this.store.dispatch(new PitanjePomocChangedAction(value)))
    ).subscribe();
    this.oblikPruzenePomoci.valueChanges.pipe(
      distinctUntilChanged(),
      filter(value => !!value),
      tap(value => this.store.dispatch(new VrstaPomocChangedAction(value)))
    ).subscribe();
    this.sub1$ = this.store.pipe(
      select(selectPitanjePomoc),
      distinctUntilChanged(),
      switchMap(pitanje => this.searchService.searchUslugaByPitanje(pitanje))
    ).subscribe(usluge => this.usluge = usluge);
    this.sub2$ = this.store.pipe(
      select(selectVrstaPomoc),
      distinctUntilChanged(),
      switchMap(vrsta => this.searchService.searchUslugaByOblikPomoci(vrsta))
    ).subscribe(usluge => this.usluge = usluge);
  }

  asKorisnikUsluga(usluga: UslugaModel): KorisnikUsluga {
    return usluga.korisnik as KorisnikUsluga;
  }
  korespAsArray(usluga: UslugaModel): KorespondencijaModel[] {
    return usluga.korespondencije as KorespondencijaModel[];
  }

  ngOnDestroy() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

}

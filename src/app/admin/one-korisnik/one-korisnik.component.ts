import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { Korisnik } from 'src/app/Models/korisnik.model';
import { Observable, Subscription } from 'rxjs';
import { selectKorisnikById, selectSelectedKorisnik, selectUslugeForKorisnikById } from '../admin.selectors';
import { GetKorisnikByIdAction, GetAllUslugaForKorisnikAction } from '../admin.actions';
import { selectKorisnikId, selectRouter } from 'src/app/main/main.reducers';
import { tap, map, mapTo, withLatestFrom, mergeMap, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { UslugaModel } from 'src/app/Models/usluga.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-one-korisnik',
  templateUrl: './one-korisnik.component.html',
  styleUrls: ['./one-korisnik.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: '0px', opacity: 0}),
          animate('500ms', style({height: '100%', opacity: 1}))
        ]),
        transition(':leave', [
          style({height: '100%', opacity: 1}),
          animate('500ms', style({height: '0px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class OneKorisnikComponent implements OnInit, OnDestroy {

  korisnik: Observable<Korisnik>;
  usluge$: Observable<UslugaModel[]>;
  id: string;
  sub$: Subscription;
  showUsluge = false;

  constructor(private store: Store<AdminState>,
              private router: Router) { }

  ngOnInit() {
    this.sub$ = this.store.pipe(
      select(selectKorisnikId),
      distinctUntilChanged(),
      tap(id => this.store.dispatch(new GetKorisnikByIdAction({id}))),
      tap(id => this.store.dispatch(new GetAllUslugaForKorisnikAction({korisnikId: id}))),
      tap(id => this.id = id)
      ).subscribe();
    this.korisnik = this.store.pipe(select(selectSelectedKorisnik));
    this.usluge$ = this.store.pipe(select(selectUslugeForKorisnikById(this.id)));
  }

  navigateToEdit() {
    this.router.navigate(['/Admin', 'editKorisnik', this.id]);
  }

  navigateToAddUsluga() {
    this.router.navigate(['/Admin', 'addUsluga', this.id]);
  }


  toggleUsluge() {
    this.showUsluge = !this.showUsluge;
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}

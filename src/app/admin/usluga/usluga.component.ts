import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/Models/korisnik.model';
import { UslugaModel } from 'src/app/Models/usluga.model';
import { selectUslugaId, selectKorisnikId } from 'src/app/main/main.reducers';
import { switchMap, tap, take } from 'rxjs/operators';
import { selectUslugaById, selectKorisnikById } from '../admin.selectors';
import { GetKorisnikByIdAction, GetAllUslugaForKorisnikAction } from '../admin.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.scss']
})
export class UslugaComponent implements OnInit {

  korisnik$: Observable<Korisnik>;
  usluga$: Observable<UslugaModel>;

  constructor(private store: Store<AdminState>,
              private router: Router) {}

  ngOnInit() {
    this.korisnik$ = this.store.pipe(
      select(selectKorisnikId),
      switchMap(korisnikId => this.store.pipe(
        select(selectKorisnikById(korisnikId)),
        tap(korisnik => {
          if (!korisnik) {
            // console.log(`dispatching usluga ${korisnikId}`);
            this.store.dispatch(new GetAllUslugaForKorisnikAction({korisnikId}));
          }
        }),
        tap(korisnik => {
          if (!korisnik) {
            // console.log(`dispatching korisnik ${korisnikId}`);
            this.store.dispatch(new GetKorisnikByIdAction({id: korisnikId}));
          }
        })
        ))
      );

    this.usluga$ = this.store.pipe(
      select(selectUslugaId),
      switchMap(uslugaId => this.store.pipe(
        select(selectUslugaById(uslugaId))
        ))
      );
  }

  navigateToUpdateKoresp(korespId: string) {
    this.usluga$.pipe(
      take(1)
    ).subscribe(usluga => {
      this.router.navigate(['/Admin', 'updateKoresp', usluga._id, korespId]);
    });
  }

}

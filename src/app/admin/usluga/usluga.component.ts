import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/Models/korisnik.model';
import { UslugaModel } from 'src/app/Models/usluga.model';
import { selectUslugaId, selectKorisnikId } from 'src/app/main/main.reducers';
import { switchMap, tap, take, distinctUntilChanged, map, distinctUntilKeyChanged } from 'rxjs/operators';
import { selectUslugaById, selectKorisnikById } from '../admin.selectors';
import { GetKorisnikByIdAction, GetAllUslugaForKorisnikAction } from '../admin.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ViewDocComponent } from '../view-doc/view-doc.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.scss']
})
export class UslugaComponent implements OnInit {

  korisnik$: Observable<Korisnik>;
  usluga$: Observable<UslugaModel>;
  baseUrl = environment.baseUrl;

  constructor(private store: Store<AdminState>,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.korisnik$ = this.store.pipe(
      select(selectKorisnikId),
      distinctUntilChanged(),
      switchMap(korisnikId => this.store.pipe(
        select(selectKorisnikById(korisnikId)),
        tap(korisnik => {
            this.store.dispatch(new GetAllUslugaForKorisnikAction({korisnikId}));
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
      distinctUntilChanged(),
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

  navigateToAddKoresp() {
    this.usluga$.pipe(
      take(1)
    ).subscribe(usluga => {
      this.router.navigate(['/Admin', 'dodajKomunikaciju', usluga._id, usluga.korisnik]);
    });
  }

  viewDokument(file: string) {
    console.log(file);
    this.dialog.open(ViewDocComponent, {
      data: {
        url: `https://foolish-cougar-41.localtunnel.me/files/${file}`
      },
      width: '100vw',
      height: '100vh'
    });
  }

}

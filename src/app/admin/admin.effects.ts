import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AdminActionTypes,
        PostKorisnikAction,
        KorisnikPostedAction,
        GetAllKorisnikAction,
        AllKorisnikLoadedAction,
        GetKorisnikByIdAction,
        OneKorisnikLoadedAction,
        PostUslugaAction,
        UslugaPostedAction,
        GetAllUslugaForKorisnikAction,
        AllUslugaForKorisnikLoadedAction,
        PostKorespondencijaAction,
        UslugaUpdatedAction,
        UpdateKorisnikAction,
        KorisnikUpdatedAction,
        UpdateKorespondencijaAction,
        GetUslugaByIdAction,
        UslugaByIdLoadedAction} from './admin.actions';
import { map, mergeMap, switchMap, withLatestFrom, filter, exhaustMap } from 'rxjs/operators';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../Models/korisnik.model';
import { Store, select } from '@ngrx/store';
import { selectAllKorisniciLoaded, selectKorisnikById } from './admin.selectors';
import { UslugaService } from '../services/usluga.service';
import { Update } from '@ngrx/entity';
import { UslugaModel } from '../Models/usluga.model';

@Injectable()
export class AdminEffects {

  constructor(private actions$: Actions,
              private korisnikService: KorisnikService,
              private uslugaService: UslugaService,
              private store: Store<any>
              ) {}

  @Effect()
  postKorisnik$ = this.actions$.pipe(
    ofType<PostKorisnikAction>(AdminActionTypes.PostKorisnik),
    switchMap(action => this.korisnikService.postKorisnik(action.payload.korisnik).pipe(
      map((korisnik: any) => new KorisnikPostedAction({korisnik}))
    ))
  );
  @Effect()
  getAllKorisnik$ = this.actions$.pipe(
    ofType<GetAllKorisnikAction>(AdminActionTypes.GetAllKorisnik),
    withLatestFrom(this.store.pipe(select(selectAllKorisniciLoaded))),
    filter(([action, loaded]) => !loaded),
    mergeMap(action => this.korisnikService.getAllKorisnik().pipe(
      map(korisnici => new AllKorisnikLoadedAction({korisnici}))
    ))
  );
  @Effect()
  getKorisnikById$ = this.actions$.pipe(
    ofType<GetKorisnikByIdAction>(AdminActionTypes.GetKorisnikById),
    // -----------------------------------------------------------------
    filter(action => !!action.payload.id),
    // --------------------------------------------------------------------
    mergeMap(action => this.korisnikService.getKorisnikById(action.payload.id).pipe(
      map(korisnik => new OneKorisnikLoadedAction({korisnik}))
    ))
  );
  @Effect()
  postUsluga$ = this.actions$.pipe(
    ofType<PostUslugaAction>(AdminActionTypes.PostUsluga),
    exhaustMap(action => this.uslugaService.postUsluga(action.payload.usluga).pipe(
      map(usluga => new UslugaPostedAction({usluga}))
    ))
  );
  @Effect()
  getAllUslugaForKorisnik$ = this.actions$.pipe(
    ofType<GetAllUslugaForKorisnikAction>(AdminActionTypes.GetAllUslugaForKorisnik),
    filter(action => !!action.payload.korisnikId),
    mergeMap(action => this.uslugaService.getAllUslugaForKorisnik(action.payload.korisnikId).pipe(
      map(usluge => new AllUslugaForKorisnikLoadedAction({usluga: usluge}))
    ))
  );

  @Effect()
  postKorespondencija$ = this.actions$.pipe(
    ofType<PostKorespondencijaAction>(AdminActionTypes.PostKorespondencija),
    exhaustMap(action => this.uslugaService.postKorespondencija(
      action.payload.uslugaId,
      action.payload.korespondencija
    ).pipe(
      map(usluga => {
        const updateUsluga: Update<UslugaModel> = {
          id: usluga._id,
          changes: usluga
        };
        return new UslugaUpdatedAction({usluga: updateUsluga});
      })
    ))
  );

  @Effect()
  updateKorisnik$ = this.actions$.pipe(
    ofType<UpdateKorisnikAction>(AdminActionTypes.UpdateKorisnik),
    exhaustMap(action => this.korisnikService.updateKorisnik(action.payload.korisnikId, action.payload.korisnik).pipe(
      map(korisnik => {
        const updateKorisnik: Update<Korisnik> = {
          id: korisnik._id,
          changes: korisnik
        };
        return new KorisnikUpdatedAction({korisnik: updateKorisnik});
      })
    ))
    );

    @Effect()
    updateKorespondencija$ = this.actions$.pipe(
      ofType<UpdateKorespondencijaAction>(AdminActionTypes.UpdateKorespondencija),
      exhaustMap(action => this.uslugaService.updateKorespondencija(
        action.payload.uslugaId,
        action.payload.korespId,
        action.payload.koresp
      ).pipe(
        map(usluga => {
          const updateUsluga: Update<UslugaModel> = {
            id: usluga._id,
            changes: usluga
          };
          return new UslugaUpdatedAction({usluga: updateUsluga});
        })
      ))
    );

    @Effect()
    getUslugaById$ = this.actions$.pipe(
      ofType<GetUslugaByIdAction>(AdminActionTypes.GetUslugaById),
      mergeMap(action => this.uslugaService.getUslugaById(action.payload.uslugaId).pipe(
        map(usluga => new UslugaByIdLoadedAction({usluga}))
      ))
    );


}

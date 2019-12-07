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
        UslugaByIdLoadedAction,
        DostDokDeletedAction,
        DeleteDostDokAction,
        DeletePripAktAction,
        PripAktDeletedAction,
        DeleteKorisnikAction,
        KorisnikDeletedAction,
        LogInAction,
        LoggedInAction,
        LogOutAction} from './admin.actions';
import { map, mergeMap, switchMap, withLatestFrom, filter, exhaustMap, tap } from 'rxjs/operators';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../Models/korisnik.model';
import { Store, select } from '@ngrx/store';
import { selectAllKorisniciLoaded, selectKorisnikById } from './admin.selectors';
import { UslugaService } from '../services/usluga.service';
import { Update } from '@ngrx/entity';
import { UslugaModel } from '../Models/usluga.model';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { defer, of } from 'rxjs';
import { UserModel } from '../Models/user.model';

@Injectable()
export class AdminEffects {

  constructor(private actions$: Actions,
              private korisnikService: KorisnikService,
              private uslugaService: UslugaService,
              private authService: AuthService,
              private router: Router,
              private store: Store<any>
              ) {}

  @Effect()
  postKorisnik$ = this.actions$.pipe(
    ofType<PostKorisnikAction>(AdminActionTypes.PostKorisnik),
    switchMap(action => this.korisnikService.postKorisnik(action.payload.korisnik).pipe(
      tap(korisnik => this.router.navigate(['/Admin', 'korisnik', korisnik._id])),
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

    @Effect()
    deleteDostDok$ = this.actions$.pipe(
      ofType<DeleteDostDokAction>(AdminActionTypes.DeleteDostDok),
      exhaustMap(action => this.uslugaService.deleteDostDok(
        action.payload.uslugaId,
        action.payload.korespId,
        action.payload.dostDokId).pipe(
          map(usluga => {
            const uslugaUpdate: Update<UslugaModel> = {
              id: usluga._id,
              changes: usluga
            };
            return new DostDokDeletedAction({usluga: uslugaUpdate});
          })
        ))
    );

    @Effect()
    deletePripAkt$ = this.actions$.pipe(
      ofType<DeletePripAktAction>(AdminActionTypes.DeletePripAkt),
      exhaustMap(action => this.uslugaService.deletePripAkt(
        action.payload.uslugaId,
        action.payload.korespId,
        action.payload.pravniAktId
      ).pipe(
        map(usluga => {
          const updateUsluga: Update<UslugaModel> = {
            id: usluga._id,
            changes: usluga
          };
          return new PripAktDeletedAction({usluga: updateUsluga});
        })
      ))
    );

    @Effect()
    deleteKorisnik$ = this.actions$.pipe(
      ofType<DeleteKorisnikAction>(AdminActionTypes.DeleteKorisnik),
      exhaustMap(action => this.korisnikService.deleteKorisnik(action.payload.id).pipe(
        map(korisnik => new KorisnikDeletedAction({korisnik})),
        tap(() => this.router.navigate(['/Admin', 'Svi korisnici']))
      ))
    );

    @Effect()
    login$ = this.actions$.pipe(
      ofType<LogInAction>(AdminActionTypes.LogIn),
      exhaustMap(action => this.authService.logIn(action.payload).pipe(
        tap(user => localStorage.setItem('miboke-token', user.token)),
        map(user => new LoggedInAction(user.user))
      ))
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
      ofType<LogOutAction>(AdminActionTypes.LogOut),
      tap(action => {
        if (localStorage.getItem('miboke-token')) {
          localStorage.removeItem('miboke-token');
        }
        this.router.navigate(['/Admin']);
      })
    );

    @Effect()
    initLogin$ = defer(() => {
      const token = localStorage.getItem('miboke-token');
      if (token) {
        const user = JSON.parse(window.atob(token.split('.')[1]));
        if (new Date(user.exp * 1000) > new Date()) {
          return of(new LoggedInAction({
            name: user.name,
            lastName: user.lastName,
            role: user.role,
            _id: user._id,
            username: user.username,
            verified: user.verified,
            password: user.password
          }));
          } else {
            return of (new LogOutAction());
        }
      } else {
        return of (new LogOutAction());
      }
    });

}

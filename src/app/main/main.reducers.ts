import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer,
  getSelectors
} from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../services/router-store';



export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export const selectRouter = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
  >('router');

export const selectKorisnikId = createSelector(
  selectRouter,
  state => state.state.params.korisnikId
);

export const selectUslugaId = createSelector(
  selectRouter,
  state => state.state.params.uslugaId as string
);

export const selectKorespId = createSelector(
  selectRouter,
  state => state.state.params.korespId as string
);


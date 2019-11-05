import { Korisnik } from '../Models/korisnik.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as korisnikActions from './admin.actions';
import { UslugaModel } from '../Models/usluga.model';
import { AppState } from '../main/main.reducers';

export interface AdminState extends AppState {
  korisnici: KorisnikState;
  usluge: UslugaState;
}
// ts-lint:disable
export interface KorisnikState extends EntityState<Korisnik> {
  loaded: boolean;
}

export interface UslugaState extends EntityState<UslugaModel> {

}

export const adapter: EntityAdapter<Korisnik> =  createEntityAdapter<Korisnik>({
  selectId: korisnik => korisnik._id
});

export const uslugaAdapter: EntityAdapter<UslugaModel> = createEntityAdapter<UslugaModel>({
  selectId: usluga => usluga._id
});

export const korisnikInitialState: KorisnikState = adapter.getInitialState({
  loaded: false
});

export const uslugeInitialState: UslugaState = uslugaAdapter.getInitialState();

export function korisnikReducer(state = korisnikInitialState, action: korisnikActions.AdminActions) {

  switch (action.type) {
    case korisnikActions.AdminActionTypes.AllKorisnikLoaded:
      return adapter.addMany(action.payload.korisnici, {...state, loaded: true});
    // tslint:disable: no-switch-case-fall-through

    case korisnikActions.AdminActionTypes.KorisnikPosted:
    case korisnikActions.AdminActionTypes.KorisnikByIdLoaded:
      return adapter.addOne(action.payload.korisnik, state);

    case korisnikActions.AdminActionTypes.KorisnikUpdated:
      return adapter.updateOne(action.payload.korisnik, state);

    default: {
      return state;
    }
  }
}

export function uslugeReducer(state = uslugeInitialState, action: korisnikActions.AdminActions) {
  switch (action.type) {
    case korisnikActions.AdminActionTypes.AllUslugaForKorisnikLoaded:
      return uslugaAdapter.addMany(action.payload.usluga, state);
    case korisnikActions.AdminActionTypes.UslugaPosted:
    case korisnikActions.AdminActionTypes.UslugaByIdLoaded:
      return uslugaAdapter.addOne(action.payload.usluga, state);
    case korisnikActions.AdminActionTypes.UslugaUpdated:
      return uslugaAdapter.updateOne(action.payload.usluga, state);
      default: {
        return state;
      }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const {
  selectAll: selectAllUsluge,
  selectEntities: selectEntitiesUsluge,
  selectIds: selectIdsUsluge,
  selectTotal: selectTotalUsluge
} = uslugaAdapter.getSelectors();

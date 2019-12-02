import { Korisnik } from '../Models/korisnik.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as korisnikActions from './admin.actions';
import { UslugaModel } from '../Models/usluga.model';
import { AppState } from '../main/main.reducers';

export interface AdminState extends AppState {
  korisnici: KorisnikState;
  usluge: UslugaState;
  pitanje: string;
  vrstaPomoci: string;
  korisnikSort: {
    invaliditet: string,
    sposobnost: string,
    zaposlenje: string,
    obrazovanje: string
  };
}
// ts-lint:disable
export interface KorisnikState extends EntityState<Korisnik> {
  loaded: boolean;
}

export interface UslugaState extends EntityState<UslugaModel> {

}

export const adapter: EntityAdapter<Korisnik> =  createEntityAdapter<Korisnik>({
  selectId: korisnik => korisnik._id,
  sortComparer: compareKorisnikByLastName
});

// ==========================comparer===============================
export function compareKorisnikByLastName(korOne: Korisnik, korTwo: Korisnik) {
  if (korOne.prezime > korTwo.prezime) {
    return 1;
  } else if (korOne.prezime < korTwo.prezime) {
    return -1;
  } else {
    if (korOne.ime > korTwo.ime) {
      return 1;
    } else if (korOne.ime < korTwo.ime) {
      return -1;
    } else {
      return 0;
    }
  }
}
// ==============================================================================
export const uslugaAdapter: EntityAdapter<UslugaModel> = createEntityAdapter<UslugaModel>({
  selectId: usluga => usluga._id,
  sortComparer: compareUslugeByDate
});
// ==================================================================================
export function compareUslugeByDate(usl1: UslugaModel, usl2: UslugaModel) {
  if (usl1.korespondencije[0].datumUpucivanjaZahtjeva && usl2.korespondencije[0].datumUpucivanjaZahtjeva) {
    if (usl1.korespondencije[0].datumUpucivanjaZahtjeva > usl2.korespondencije[0].datumUpucivanjaZahtjeva) {
      return -1;
    } else if (usl1.korespondencije[0].datumUpucivanjaZahtjeva < usl2.korespondencije[0].datumUpucivanjaZahtjeva) {
      return 1;
    }
  } else {
    return 0;
  }
}
// ========================================================================================
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

    case korisnikActions.AdminActionTypes.KorisnikDeleted:
      return adapter.removeOne(action.payload.korisnik._id, state);

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
    case korisnikActions.AdminActionTypes.DostDokDeleted:
    case korisnikActions.AdminActionTypes.PripAktDeleted:
      return uslugaAdapter.updateOne(action.payload.usluga, state);
      default: {
        return state;
      }
  }
}

export function pitanjeReducer(state = '', action: korisnikActions.AdminActions) {
  switch (action.type) {
    case korisnikActions.AdminActionTypes.PitanjePomocChange:
      return action.payload;
      default: {
        return state;
      }
  }
}

export function vrstaPomociReducer(state = '', action: korisnikActions.AdminActions) {
  switch (action.type) {
    case korisnikActions.AdminActionTypes.VrstaPomocChange:
      return action.payload;
      default: {
        return state;
      }
  }
}

export const initialKorisnikSortState = {
  invaliditet: '',
  zaposlenje: '',
  obrazovanje: '',
  sposobnost: ''
};

export function korisnikSortReducer(state = initialKorisnikSortState, action: korisnikActions.AdminActions) {
  switch (action.type) {
    case korisnikActions.AdminActionTypes.InvaliditetChange:
      return {...state, invaliditet: action.payload};
    case korisnikActions.AdminActionTypes.SposobnostChange:
      return {...state, sposobnost: action.payload};
    case korisnikActions.AdminActionTypes.ZaposlenjeChange:
      return {...state, zaposlenje: action.payload};
    case korisnikActions.AdminActionTypes.ObrazovanjeChange:
      return {...state, obrazovanje: action.payload};
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

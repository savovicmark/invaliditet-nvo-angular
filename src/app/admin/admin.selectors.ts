import { selectAll, selectIds, selectTotal, selectEntities, AdminState, selectAllUsluge, selectEntitiesUsluge } from './admin.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectKorisnikId } from '../main/main.reducers';
import { KorespondencijaModel } from '../Models/usluga.model';

export const selectAdminState = createFeatureSelector<AdminState>('admin');
export const selectKorisniciState = createSelector(
  selectAdminState,
  adminState => adminState.korisnici
);
export const selectAllKorisnik = createSelector(
  selectKorisniciState,
  selectAll
);

export const selectKorisniciEntities = createSelector(
  selectKorisniciState,
  selectEntities
);

export const selectKorisnikById = (id: string) => createSelector(
  selectKorisniciEntities,
  korisniciEnt => korisniciEnt[id]
);

export const selectSelectedKorisnik = createSelector(
  selectKorisniciEntities,
  selectKorisnikId,
  (korEnt, id) => korEnt[id]
);

export const selectAllKorisniciLoaded = createSelector(
  selectKorisniciState,
  korisniciState => korisniciState.loaded
);
// =====================================================================================================

export const selectUslugaState = createSelector(
  selectAdminState,
  adminState => adminState.usluge
);

export const selectUslugaAll = createSelector(
  selectUslugaState,
  selectAllUsluge
);

export const selectUslugaEntities = createSelector(
  selectUslugaState,
  selectEntitiesUsluge
);

export const selectUslugeForKorisnikById = (id: string) => createSelector(
  selectUslugaAll,
  usluge => usluge.filter(usluga => usluga.korisnik === id)
);
// ================================================================================
export function sortKorespById(koresp1: KorespondencijaModel, koresp2: KorespondencijaModel) {
  if (koresp1.datumUpucivanjaZahtjeva && koresp2.datumUpucivanjaZahtjeva) {
    if (koresp1.datumUpucivanjaZahtjeva > koresp2.datumUpucivanjaZahtjeva) {
      return -1;
    } else if (koresp1.datumUpucivanjaZahtjeva < koresp2.datumUpucivanjaZahtjeva) {
      return 1;
    }
  } else {
    return 0;
  }
}
// =================================================================================
export const selectUslugaById = (id: string) => createSelector(
  selectUslugaEntities,
  (usluge) => {
    if (usluge[id]) {
      const usluga = usluge[id];
      usluga.korespondencije = (usluga.korespondencije as KorespondencijaModel[]).sort(sortKorespById);
      return usluga;
    } else {
      return usluge[id];
    }
  }
);

export const selectKorespondencijaById = (uslugaId: string, korespId: string) => createSelector(
  selectUslugaById(uslugaId),
  usluga => { if (usluga) {
    return (usluga.korespondencije as KorespondencijaModel[]).filter(usl => usl._id === korespId);
  }
 }
);

export const selectPitanjePomoc = createSelector(
  selectAdminState,
  adminState => adminState.pitanje
);

export const selectVrstaPomoc = createSelector(
  selectAdminState,
  adminState => adminState.vrstaPomoci
);

export const selectInvaliditet = createSelector(
  selectAdminState,
  adminState => adminState.korisnikSort.invaliditet
);

export const selectSposobnost = createSelector(
  selectAdminState,
  adminState => adminState.korisnikSort.sposobnost
);

export const selectZaposlenje = createSelector(
  selectAdminState,
  adminState => adminState.korisnikSort.zaposlenje
);

export const selectObrazovanje = createSelector(
  selectAdminState,
  adminState => adminState.korisnikSort.obrazovanje
);

export const selectUserId = createSelector(
  selectAdminState,
  adminState => adminState.user._id
);

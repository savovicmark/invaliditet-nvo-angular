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

export const selectUslugaById = (id: string) => createSelector(
  selectUslugaEntities,
  usluge => usluge[id]
);

export const selectKorespondencijaById = (uslugaId: string, korespId: string) => createSelector(
  selectUslugaById(uslugaId),
  usluga => (usluga.korespondencije as KorespondencijaModel[]).filter(usl => usl._id === korespId)
);

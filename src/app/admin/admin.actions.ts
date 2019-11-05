import { Action } from '@ngrx/store';
import { Korisnik } from '../Models/korisnik.model';
import { UslugaModel, KorespondencijaModel } from '../Models/usluga.model';
import { Update } from '@ngrx/entity';

export enum AdminActionTypes {
  PostKorisnik = '[Admin Form Page] Post Korisnik',
  GetAllKorisnik = '[Admin All Korisnik Page] Get All Korisnik',
  GetKorisnikById = '[Admin One Korisnik Page] Get Korisnik By Id',
  UpdateKorisnik = '[Admin Update Korisnik Page] Update Korisnik',
  KorisnikPosted = '[Admin API] Korisnik Posted',
  AllKorisnikLoaded = '[Admin API] All Korisnik Loaded',
  KorisnikByIdLoaded = '[Admin API] One Korisnik Loaded',
  KorisnikUpdated = '[Admin API] Korisnik Updated',
  // ==================================================================================
  PostUsluga = '[Admin Post Usluga Page] Post Usluga',
  GetAllUslugaForKorisnik = '[Admin] Get Usluga For Korisnik',
  AllUslugaForKorisnikLoaded = '[Admin API] All Usluga For Korisnik Loaded',
  GetUslugaById = '[Admin] Get Usluga By Id',
  UslugaByIdLoaded = '[Admin API] Usluga By Id Loaded',
  UslugaPosted = '[Admin API] Usluga Posted',
  PostKorespondencija = '[Admin Post Korespondencija] Post Korespondencija',
  KorespondencijaPosted = '[Admin API] Korespondencija Posted',
  UpdateKorespondencija = '[Admin Update Korespondencija] Update Korespondencija',
  UslugaUpdated = '[Admin API] Usluga Updated'
}

export class PostKorisnikAction implements Action {
  readonly type = AdminActionTypes.PostKorisnik;
  constructor(public payload: {korisnik: Korisnik}) {}
}

export class GetAllKorisnikAction implements Action {
  readonly type = AdminActionTypes.GetAllKorisnik;
}

export class GetKorisnikByIdAction implements Action {
  readonly type = AdminActionTypes.GetKorisnikById;
  constructor(public payload: {id: string}) {}
}

export class UpdateKorisnikAction implements Action {
  readonly type = AdminActionTypes.UpdateKorisnik;
  constructor(public payload: {korisnikId: string, korisnik: any}) {}
}

export class KorisnikUpdatedAction implements Action {
  readonly type = AdminActionTypes.KorisnikUpdated;
  constructor(public payload: {korisnik: Update<Korisnik>}) {}
}

export class KorisnikPostedAction implements Action {
  readonly type = AdminActionTypes.KorisnikPosted;
  constructor(public payload: {korisnik: Korisnik}) {}
}

export class AllKorisnikLoadedAction implements Action {
  readonly type = AdminActionTypes.AllKorisnikLoaded;
  constructor(public payload: {korisnici: Korisnik[]}) {}
}

export class OneKorisnikLoadedAction implements Action {
  readonly type = AdminActionTypes.KorisnikByIdLoaded;
  constructor(public payload: {korisnik: Korisnik}) {}
}
// ==========================================================================================
export class PostUslugaAction implements Action {
  readonly type = AdminActionTypes.PostUsluga;
  constructor(public payload: {usluga: UslugaModel}) {}
}

export class GetAllUslugaForKorisnikAction implements Action {
  readonly type = AdminActionTypes.GetAllUslugaForKorisnik;
  constructor(public payload: {korisnikId: string}) {}
}

export class AllUslugaForKorisnikLoadedAction implements Action {
  readonly type = AdminActionTypes.AllUslugaForKorisnikLoaded;
  constructor(public payload: {usluga: UslugaModel[]}) {}
}

export class GetUslugaByIdAction implements Action {
  readonly type = AdminActionTypes.GetUslugaById;
  constructor(public payload: {uslugaId: string}) {}
}

export class UslugaByIdLoadedAction implements Action {
  readonly type = AdminActionTypes.UslugaByIdLoaded;
  constructor(public payload: {usluga: UslugaModel}) {}
}

export class UslugaPostedAction implements Action {
  readonly type = AdminActionTypes.UslugaPosted;
  constructor(public payload: {usluga: UslugaModel}) {}
}

export class UslugaUpdatedAction implements Action {
  readonly type = AdminActionTypes.UslugaUpdated;
  constructor(public payload: {usluga: Update<UslugaModel>}) {}
}

export class PostKorespondencijaAction implements Action {
  readonly type = AdminActionTypes.PostKorespondencija;
  constructor(public payload: {korespondencija: KorespondencijaModel, uslugaId: string}) {}
}

export class KorespondencijaPostedAction implements Action {
  readonly type = AdminActionTypes.KorespondencijaPosted;
  constructor(public payload: {korespondencija: KorespondencijaModel}) {}
}

export class UpdateKorespondencijaAction implements Action {
  readonly type = AdminActionTypes.UpdateKorespondencija;
  constructor(public payload: {uslugaId: string, korespId: string, koresp: KorespondencijaModel}) {}
}
export type AdminActions = GetAllKorisnikAction
                          | GetKorisnikByIdAction
                          | PostKorisnikAction
                          | UpdateKorisnikAction
                          | AllKorisnikLoadedAction
                          | OneKorisnikLoadedAction
                          | KorisnikPostedAction
                          | PostUslugaAction
                          | UslugaPostedAction
                          | PostKorespondencijaAction
                          | UslugaUpdatedAction
                          | KorespondencijaPostedAction
                          | GetAllUslugaForKorisnikAction
                          | AllUslugaForKorisnikLoadedAction
                          | KorisnikUpdatedAction
                          | UpdateKorespondencijaAction
                          | GetUslugaByIdAction
                          | UslugaByIdLoadedAction;

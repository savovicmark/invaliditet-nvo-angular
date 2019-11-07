import { Dokument } from './dokument.model';

export interface KorespondencijaModel {
  _id?: string;
  koJePodnioZahtjev?: string;
  imeKoJePodnioZahtjev?: string;
  prezimeKoJePodnioZahtjev?: string;
  datumUpucivanjaZahtjeva?: Date;
  kojimPutemJePodnijetZahtjev?: string[];
  pitanjeZaKojeJeTrazenaPomoc?: string[];
  sazetakPitanja?: string;
  dostavljenaDokumenta?: Dokument[];
  datumOdgovora?: Date;
  komeJeUpucenOdgovor?: string;
  imeKomeJeUpucenOdgovor?: string;
  prezimeKomeJeUpucenOdgovor?: string;
  kojimPutemJePruzenOdgovor?: string[];
  oblikPruzenePomoci?: string[];
  opisPruzenePomoci?: string;
  pripremljenaPravnaAkta?: Dokument[];
  datumOdgovoraIliNovogObracanja?: Date;
  sazetakOdgovoraIliNovogObracanja?: string;
  rezultatPruzenePomoci?: string;
}

export interface UslugaModel {
  _id?: string;
  korisnik: string;
  korespondencije: KorespondencijaModel[] | KorespondencijaModel;
}


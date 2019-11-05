import { KorespondencijaModel } from './usluga.model';

export interface PodnosilacZahtjeva {
  ime?: string;
  prezime?: string;
  srodstvo?: string[];
  telefon?: string;
  adresa?: string;
}

export interface Korisnik {
  _id?: string;
  ime?: string;
  prezime?: string;
  starosnaDob?: string;
  mjestoRodjenja?: string;
  mjestoStanovanja?: string;
  adresa?: string;
  datumRodjenja?: Date;
  JMBG?: string;
  telefon?: string;
  mail?: string;
  pol?: string;
  vrstaInvaliditeta?: string[];
  dijagnoza?: string;
  poslovnaSposobnost?: string;
  obrazovanje?: string;
  zanimanje?: string;
  zaposlenje?: string;
  pripadnostJosNekojMarginalizovanojGrupi?: string;
  brClanovaDomacinstvaISrodstvo?: string;
  stambeniStatus?: string[];
  podnosilacZahtjeva?: PodnosilacZahtjeva;
  pruzeneUsluge?: string[] | KorespondencijaModel[];
}

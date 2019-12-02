import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Korisnik } from '../Models/korisnik.model';
import { environment } from '../../environments/environment';
import { UslugaModel } from '../Models/usluga.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  searchKorisnik(ime: string, prezime: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/search/korisnik`, {
      params: new HttpParams().set('name', ime).set('lastName', prezime)
    });
  }

  searchUslugaByPitanje(pitanje: string): Observable<UslugaModel[]> {
    return this.http.get<UslugaModel[]>(`${this.baseUrl}/search/usluge/pitanje`, {
      params: new HttpParams().set('term', pitanje)
    });
  }

  searchUslugaByOblikPomoci(oblik: string): Observable<UslugaModel[]> {
    return this.http.get<UslugaModel[]>(`${this.baseUrl}/search/usluge/oblikPomoci`, {
      params: new HttpParams().set('term', oblik)
    });
  }

  searchKorisnikByInvaliditet(inval: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/search/korisnik/invaliditet`, {
      params: new HttpParams().set('invaliditet', inval)
    });
  }

  searchKorisnikByObrazovanje(obraz: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/search/korisnik/obrazovanje`, {
      params: new HttpParams().set('obrazovanje', obraz)
    });
  }

  searchKorisnikBySposobnost(spos: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/search/korisnik/sposobnost`, {
      params: new HttpParams().set('sposobnost', spos)
    });
  }

  searchKorisnikByZaposlenje(zap: string): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/search/korisnik/zaposlenje`, {
      params: new HttpParams().set('zaposlenje', zap)
    });
  }

  getKorisnikCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${this.baseUrl}/search/korisnik/count`);
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Korisnik } from '../Models/korisnik.model';
import { Store, select } from '@ngrx/store';
import { selectKorisnikById } from '../admin/admin.selectors';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private store: Store<any>) { }

  postKorisnik(korisnik): Observable<Korisnik> {
    return this.http.post<Korisnik>(`${this.baseUrl}/korisnik`, korisnik);
  }

  getAllKorisnik(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(`${this.baseUrl}/korisnik`);
  }

  getKorisnikById(id: string): Observable<Korisnik> {
    return this.http.get<Korisnik>(`${this.baseUrl}/korisnik/${id}`);
  }

  updateKorisnik(korisnikId: string, korisnik: Korisnik): Observable<Korisnik> {
    return this.http.patch<Korisnik>(`${this.baseUrl}/korisnik`, {korisnikId, korisnik});
  }

}

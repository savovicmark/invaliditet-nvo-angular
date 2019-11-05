import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UslugaModel, KorespondencijaModel } from '../Models/usluga.model';
import { UslugaPostedAction } from '../admin/admin.actions';

@Injectable({
  providedIn: 'root'
})
export class UslugaService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/file`, formData);
  }

  postUsluga(usluga: UslugaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/usluga`, usluga);
  }

  getVrstePomoci(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/vrstaPomoci`);
  }

  postVrstaPomoci(vrsta: {vrstaPomoci: string}): Observable<{vrstaPomoci: string}> {
    return this.http.post<{vrstaPomoci: string}>(`${this.baseUrl}/vrstaPomoci`, vrsta);
  }

  postKorespondencija(uslugaId: string, korespondencija: KorespondencijaModel): Observable<UslugaModel> {
    return this.http.post<UslugaModel>(`${this.baseUrl}/usluga/korespondencija`, {
      uslugaId,
      korespondencija
    });
  }

  getAllUslugaForKorisnik(id: string): Observable<UslugaModel[]> {
    return this.http.get<UslugaModel[]>(`${this.baseUrl}/usluga/${id}`);
  }

  getUslugaById(id: string): Observable<UslugaModel> {
    return this.http.get<UslugaModel>(`${this.baseUrl}/usluga/usluge/${id}`);
  }

  updateKorespondencija(uslugaId: string, korespId: string, koresp: KorespondencijaModel): Observable<UslugaModel> {
    return this.http.patch<UslugaModel>(`${this.baseUrl}/usluga/korespondencija`, {
      uslugaId,
      korespId,
      koresp
    });
  }
}

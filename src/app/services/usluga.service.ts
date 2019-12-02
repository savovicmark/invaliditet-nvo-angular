import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UslugaModel, KorespondencijaModel } from '../Models/usluga.model';
import { UslugaPostedAction } from '../admin/admin.actions';
import { PitanjeZaKojeJeTrazenaPomoc, BesplatnaPravnaPomoc, UslugeSocZastite } from '../Models/pitanja.model';

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

  getVrstePomoci(): Observable<PitanjeZaKojeJeTrazenaPomoc[]> {
    return this.http.get<PitanjeZaKojeJeTrazenaPomoc[]>(`${this.baseUrl}/pitanja/vrstaPomoci`);
  }

  postVrstaPomoci(vrsta: {vrstaPomoci: string}): Observable<PitanjeZaKojeJeTrazenaPomoc> {
    return this.http.post<PitanjeZaKojeJeTrazenaPomoc>(`${this.baseUrl}/pitanja/vrstaPomoci`, vrsta);
  }

  deleteVrstePomoci(id: string): Observable<PitanjeZaKojeJeTrazenaPomoc[]> {
    return this.http.delete<PitanjeZaKojeJeTrazenaPomoc[]>(`${this.baseUrl}/pitanja/vrstaPomoci`, {
      params: new HttpParams().set('id', id)
    });
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

  deleteDostDok(uslugaId: string, korespId: string, dostDokId): Observable<UslugaModel> {
    return this.http.patch<UslugaModel>(`${this.baseUrl}/usluga/deleteDostDok`, {
      uslugaId,
      korespId,
      dostDokId
    });
  }

  deletePripAkt(uslugaId: string, korespId: string, pravniAktId): Observable<UslugaModel> {
    return this.http.patch<UslugaModel>(`${this.baseUrl}/usluga/deletePripAkt`, {
      uslugaId,
      korespId,
      pravniAktId
    });
  }

  getUslugaCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${this.baseUrl}/search/uslugaCount`);
  }

  getAllBespPomoc(): Observable<BesplatnaPravnaPomoc[]> {
    return this.http.get<BesplatnaPravnaPomoc[]>(`${this.baseUrl}/pitanja/besplatnaPomoc`);
  }

  postBespPomoc(pomoc: {bespPomoc: string}): Observable<BesplatnaPravnaPomoc> {
    return this.http.post<BesplatnaPravnaPomoc>(`${this.baseUrl}/pitanja/besplatnaPomoc`, pomoc);
  }

  deleteBespPomoc(id: string): Observable<BesplatnaPravnaPomoc[]> {
    return this.http.delete<BesplatnaPravnaPomoc[]>(`${this.baseUrl}/pitanja/besplatnaPomoc`, {
      params: new HttpParams().set('id', id)
    });
  }

  getAllSocZastita(): Observable<UslugeSocZastite[]> {
    return this.http.get<UslugeSocZastite[]>(`${this.baseUrl}/pitanja/socZastita`);
  }

  postSocZastita(zastita: {socZastita: string}): Observable<UslugeSocZastite> {
    return this.http.post<UslugeSocZastite>(`${this.baseUrl}/pitanja/socZastita`, zastita);
  }

  deleteSocZastita(id: string): Observable<UslugeSocZastite[]> {
    return this.http.delete<UslugeSocZastite[]>(`${this.baseUrl}/pitanja/socZastita`, {
      params: new HttpParams().set('id', id)
    });
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Korisnik } from '../Models/korisnik.model';
import { Observable } from 'rxjs';
import { selectKorisnikById } from '../admin/admin.selectors';
import { select, Store } from '@ngrx/store';
import { AdminState } from '../admin/admin.reducers';
import { tap, filter, first } from 'rxjs/operators';
import { GetKorisnikByIdAction } from '../admin/admin.actions';

@Injectable({
  providedIn: 'root'
})
export class EditKorisnikService implements Resolve<Korisnik> {

  constructor(private store: Store<AdminState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Korisnik> {
    const korisnikId = route.params.korisnikId as string;
    return this.store.pipe(
      select(selectKorisnikById(korisnikId)),
      tap(korisnik => {
        if (!korisnik) {
          this.store.dispatch(new GetKorisnikByIdAction({id: korisnikId}));
        }
      }),
      filter(korisnik => !!korisnik),
      first()
      );
  }
}

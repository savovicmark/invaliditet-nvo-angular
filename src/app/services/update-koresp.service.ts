import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KorespondencijaModel } from '../Models/usluga.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin/admin.reducers';
import { selectUslugaById, selectKorespondencijaById } from '../admin/admin.selectors';
import { tap, filter, first, exhaustMap, map } from 'rxjs/operators';
import { GetUslugaByIdAction } from '../admin/admin.actions';


@Injectable({
  providedIn: 'root'
})
export class UpdateKorespService implements Resolve<KorespondencijaModel> {

  constructor(
    private store: Store<AdminState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KorespondencijaModel> {
    const uslugaId = route.params.uslugaId as string;
    const korespId = route.params.korespId as string;
    return this.store.pipe(
      select(selectUslugaById(uslugaId)),
      tap(usluga => {
        if (!usluga) {
          this.store.dispatch(new GetUslugaByIdAction({uslugaId}));
        }
      }),
      filter(usluga => !!usluga),
      exhaustMap(usluga => this.store.pipe(select(selectKorespondencijaById(usluga._id, korespId)))),
      map(koresp => koresp[0]),
      filter(koresp => !!koresp),
      first()
    );
  }

}

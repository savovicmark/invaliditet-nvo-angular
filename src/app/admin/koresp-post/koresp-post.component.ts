import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { UslugaModel } from 'src/app/Models/usluga.model';
import { Observable } from 'rxjs';
import { selectUslugaId } from 'src/app/main/main.reducers';
import { switchMap, tap, filter, first } from 'rxjs/operators';
import { selectUslugaById } from '../admin.selectors';
import { GetUslugaByIdAction } from '../admin.actions';

@Component({
  selector: 'app-koresp-post',
  templateUrl: './koresp-post.component.html',
  styleUrls: ['./koresp-post.component.scss']
})
export class KorespPostComponent implements OnInit {

  uslugaId: string;

  constructor(
    private store: Store<AdminState>
  ) { }

  ngOnInit() {
     this.store.pipe(
      select(selectUslugaId),
      tap(uslugaId => this.uslugaId = uslugaId),
      filter(uslugaId => !!uslugaId),
      first()
    ).subscribe();
  }

}

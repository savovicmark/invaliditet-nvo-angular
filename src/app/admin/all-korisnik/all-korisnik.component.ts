import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { GetAllKorisnikAction } from '../admin.actions';
import { selectAllKorisnik } from '../admin.selectors';

@Component({
  selector: 'app-all-korisnik',
  templateUrl: './all-korisnik.component.html',
  styleUrls: ['./all-korisnik.component.scss']
})
export class AllKorisnikComponent implements OnInit {

  korisnici$ = this.store.pipe(select(selectAllKorisnik));

  constructor(private store: Store<AdminState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAllKorisnikAction());
  }

}

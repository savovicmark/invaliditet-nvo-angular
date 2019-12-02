import { Component, OnInit, Inject } from '@angular/core';
import { Korisnik } from '../Models/korisnik.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-korisnik-search',
  templateUrl: './korisnik-search.component.html',
  styleUrls: ['./korisnik-search.component.scss']
})
export class KorisnikSearchComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
  }

}

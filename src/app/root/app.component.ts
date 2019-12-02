import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav, MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { KorisnikSearchComponent } from '../korisnik-search/korisnik-search.component';
import { debounceTime, distinctUntilChanged, switchMap, filter, exhaustMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { Korisnik } from '../Models/korisnik.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  title = 'mibokefront';
  searchForm = new FormGroup({
    userFirstName: new FormControl(''),
    userLastName: new FormControl('')
  });
  korisnici: Korisnik[] | [] = [];


  constructor(public breakpiontObserver: BreakpointObserver,
              private router: Router,
              public dialog: MatDialog,
              private searchService: SearchService) {

  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(
      debounceTime(400),
      filter(value => value.userFirstName || value.userLastName),
      exhaustMap(value => this.searchService.searchKorisnik(value.userFirstName, value.userLastName))
    ).subscribe(korisnici => this.korisnici = korisnici);
    this.breakpiontObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidenav.close();
          this.sidenav.mode = 'over';
        } else {
        this.sidenav.open();
        this.sidenav.opened = true;
        this.sidenav.mode = 'side';
      }
    });
  }

  openSearchKomp() {
   const dialogRef = this.dialog.open(KorisnikSearchComponent, {
      height: '90vh',
      width: '70vw',
      data: {
        korisnici: this.korisnici
      }
    });
   console.log(this.korisnici);
   dialogRef.afterClosed().subscribe(() => this.korisnici = []);
   this.searchForm.reset();
  }

}

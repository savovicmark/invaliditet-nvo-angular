import { Component, OnInit, ViewChild } from '@angular/core';
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  title = 'mibokefront';
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  constructor(public breakpiontObserver: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
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
}

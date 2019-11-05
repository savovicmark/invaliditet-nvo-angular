import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: '0px', opacity: 0}),
          animate('200ms ease-out', style({height: '100%', opacity: 1}))
        ]),
        transition(':leave', [
          style({height: '100%', opacity: 1}),
          animate('200ms ease-out', style({height: '0px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class NavItemComponent implements OnInit {

  hide = true;
  @Input() title: string;
  @Input() links: string[];
  icon = 'chevron_right';

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.hide = !this.hide;
    if (this.icon === 'chevron_right') {
      this.icon = 'keyboard_arrow_down';
    } else {
      this.icon = 'chevron_right';
    }
  }

}

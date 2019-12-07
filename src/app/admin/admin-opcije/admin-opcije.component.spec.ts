import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpcijeComponent } from './admin-opcije.component';

describe('AdminOpcijeComponent', () => {
  let component: AdminOpcijeComponent;
  let fixture: ComponentFixture<AdminOpcijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOpcijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOpcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdPassComponent } from './upd-pass.component';

describe('UpdPassComponent', () => {
  let component: UpdPassComponent;
  let fixture: ComponentFixture<UpdPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

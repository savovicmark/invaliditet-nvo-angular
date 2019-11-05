import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKorespComponent } from './update-koresp.component';

describe('UpdateKorespComponent', () => {
  let component: UpdateKorespComponent;
  let fixture: ComponentFixture<UpdateKorespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKorespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKorespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

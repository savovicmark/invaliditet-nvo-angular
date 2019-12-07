import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { LogInAction } from '../admin.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AdminState>) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  logIn() {
    this.store.dispatch(new LogInAction({
      username: this.logInForm.get('username').value,
      password: this.logInForm.get('password').value
    }));
    this.logInForm.reset();
  }

}

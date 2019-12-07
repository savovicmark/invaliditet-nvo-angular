import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateCrossField } from 'src/app/services/errorStateMatcher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  errorMatcher = new ErrorStateCrossField();

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      sifra: this.fb.group({
        password: ['', Validators.required],
        potvrda: ['', Validators.required]
      }, {validators: this.validatePass})
    });
  }

  signUp() {
    this.authService.signUp({
      name: this.signUpForm.get('name').value,
      lastName: this.signUpForm.get('lastName').value,
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('sifra.password').value
    }).subscribe(user => {
      this.signUpForm.reset();
      if (user) {
        console.log(user);
      }
    });
  }

  validatePass(c: AbstractControl): {[key: string]: boolean} | null {
    const pass1 = c.get('password');
    const pass2 = c.get('potvrda');
    if (pass1.value !== pass2.value) {
      // tslint:disable-next-line: object-literal-key-quotes
      return {'passMatch': true};
    } else {
      return null;
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ErrorStateCrossField } from '../../services/errorStateMatcher';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upd-pass',
  templateUrl: './upd-pass.component.html',
  styleUrls: ['./upd-pass.component.scss']
})
export class UpdPassComponent implements OnInit {

  lozinkaForm: FormGroup;
  errorMatcher = new ErrorStateCrossField();
  id: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.lozinkaForm = this.fb.group({
      lozinka: this.fb.group({
        sifra: ['', Validators.required],
        potvrda: ['', Validators.required]
      }, {validators: this.validatePass})
    });
    const token = localStorage.getItem('miboke-token');
    if (token) {
      const user = JSON.parse(window.atob(token.split('.')[1]));
      this.id = user._id;
    }
  }

  validatePass(c: AbstractControl): {[key: string]: boolean} | null {
    const pass1 = c.get('sifra');
    const pass2 = c.get('potvrda');
    if (pass1.value !== pass2.value) {
      // tslint:disable-next-line: object-literal-key-quotes
      return {'passMatch': true};
    } else {
      return null;
    }
  }

  changePass() {
    this.authService.changePass(this.lozinkaForm.get('lozinka.sifra').value, this.id).subscribe(res => {
      this.lozinkaForm.reset();
      if (res.status === 200 || res.status === 304) {
        this.toastr.success('Lozinka promijenjena', 'USPJESNO');
      }
      this.router.navigate(['/Admin']);
    },
    err => {
      this.lozinkaForm.reset();
      this.toastr.error('Lozinka nije promijenjena', 'GRESKA');
      this.router.navigate(['/Admin']);
    });
  }

}

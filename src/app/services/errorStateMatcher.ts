import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, ControlContainer } from '@angular/forms';

export class ErrorStateCrossField implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

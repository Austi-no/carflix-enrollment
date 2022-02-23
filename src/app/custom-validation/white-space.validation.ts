import { AbstractControl, ValidationErrors } from '@angular/forms';

export class WhiteValidator {
  static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true }
    }
    return null;
  }
}

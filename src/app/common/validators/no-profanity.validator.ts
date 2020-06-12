import { FormControl, ValidationErrors } from '@angular/forms';
import * as badwordsRegExp from 'badwords/object';

export function noProfanityValidator(control: FormControl): ValidationErrors | null {
  return !badwordsRegExp[control.value] ? null : { profanity: true };
}

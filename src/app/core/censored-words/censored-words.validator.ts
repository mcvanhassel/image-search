import { Inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { CensoredWords, CensoredWordsToken } from './censored-words';

@Injectable({
  providedIn: 'root',
})
export class CensoredWordsValidator implements Validator {
  constructor(@Inject(CensoredWordsToken) private readonly censoredWords: CensoredWords) {}

  validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.censoredWords.includes(control.value) ? { censored: true } : null;
    };
  }
}

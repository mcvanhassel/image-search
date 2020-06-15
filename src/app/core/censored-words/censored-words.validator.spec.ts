import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { CensoredWordsToken } from './censored-words';
import { CensoredWordsValidator } from './censored-words.validator';

describe('CensoredWordsValidator', () => {
  let validator: CensoredWordsValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CensoredWordsValidator, { provide: CensoredWordsToken, useValue: ['forbidden'] }],
    });
    validator = TestBed.inject(CensoredWordsValidator);
  });

  it('should be created', () => {
    expect(validator).toBeTruthy();
  });

  it('control should be valid', () => {
    expect(validator.validate()(new FormControl('test'))).toEqual(null);
  });

  it('control should not be valid', () => {
    expect(validator.validate()(new FormControl('forbidden'))).toEqual({ censored: true });
  });
});

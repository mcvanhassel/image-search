import { NgModule } from '@angular/core';
import * as badWords from 'badwords/array';

import { CensoredWordsToken } from '../censored-words';

@NgModule({
  providers: [{ provide: CensoredWordsToken, useValue: { value: badWords } }],
})
export class BadWordsModule {}

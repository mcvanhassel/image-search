import { NgModule } from '@angular/core';
import * as badwords from 'badwords/array';

import { CensoredWordsToken } from '../censored-words';

@NgModule({
  providers: [{ provide: CensoredWordsToken, useValue: badwords }],
})
export class BadWordsModule {}

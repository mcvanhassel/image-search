import { InjectionToken } from '@angular/core';

export type CensoredWords = string[];

export const CensoredWordsToken = new InjectionToken<CensoredWords>('CensoredWordsToken');

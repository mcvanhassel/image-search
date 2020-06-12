import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GiphySearchModule } from './giphy-search';
import { NavbarModule } from './navbar';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    GiphySearchModule.forRoot({
      apiUrl: 'https://api.giphy.com/v1',
      language: 'en',
    }),
  ],
  exports: [NavbarModule],
})
export class CoreModule {}

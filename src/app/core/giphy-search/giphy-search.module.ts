import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ImageSearchServiceToken } from '../image-search';
import { GiphyConfiguration } from './models/giphy-configuration';
import { GiphySearchService } from './services/giphy-search.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [{ provide: ImageSearchServiceToken, useClass: GiphySearchService }],
})
export class GiphySearchModule {
  static forRoot(config: GiphyConfiguration): ModuleWithProviders<GiphySearchModule> {
    return {
      ngModule: GiphySearchModule,
      providers: [{ provide: GiphyConfiguration, useValue: config }],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: GiphySearchModule,
    };
  }
}

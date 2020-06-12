import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';

import { ImageSearchResponse } from './image-search-response';

export const ImageSearchServiceToken = new InjectionToken<Provider>('ImageSearchServiceToken');

export interface ImageSearchService {
  search(query: string, pageIndex?: number): Observable<ImageSearchResponse>;
}

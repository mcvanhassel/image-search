import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ImageSearchResponse } from './image-search-response';

export const ImageSearchServiceToken = new InjectionToken<ImageSearchService>('ImageSearchServiceToken');

export interface ImageSearchService {
  search(query: string, pageIndex?: number, pageSize?: number): Observable<ImageSearchResponse>;
}

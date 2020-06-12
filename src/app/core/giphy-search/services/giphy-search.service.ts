import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Image, ImageSearchResponse, ImageSearchService, ImageSource } from '../../image-search';
import { Giphy } from '../models/giphy';
import { GiphyConfiguration } from '../models/giphy-configuration';
import { GiphySearchResponse } from '../models/giphy-search-response';
import { GiphySource } from '../models/giphy-source';
import { Rating } from '../models/rating';
import { GiphySettingsService } from './giphy-settings.service';

@Injectable()
export class GiphySearchService implements ImageSearchService {
  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly config: GiphyConfiguration,
    private readonly giphySettingsService: GiphySettingsService
  ) {}

  search(query: string, pageIndex: number): Observable<ImageSearchResponse> {
    const limit = this.giphySettingsService.limit || 25;
    const params = new HttpParams()
      .set('api_key', this.giphySettingsService.apiKey || '')
      .set('limit', `${limit}`)
      .set('rating', this.giphySettingsService.rating || Rating.G)
      .set('lang', this.config.language)
      .set('q', query)
      .set('offset', `${pageIndex * limit}`);

    return this.http
      .get<GiphySearchResponse>(`${this.config.apiUrl}/gifs/search`, { params })
      .pipe(map(this.deserializeSearchResponse));
  }

  private readonly deserializeSearchResponse = ({ data, pagination }: GiphySearchResponse): ImageSearchResponse => {
    return {
      images: data.map(this.deserializeImage),
      pagination: { count: pagination.count, offset: pagination.offset, total: pagination.total_count },
    };
  };

  private readonly deserializeImage = ({ id, title, source, import_datetime, images }: Giphy): Image => ({
    id,
    title,
    source,
    created: new Date(import_datetime),
    images: {
      original: this.deserializeImageSource(images.original),
      small: this.deserializeImageSource(images.fixed_height_small),
      medium: this.deserializeImageSource(images.fixed_height),
    },
  });

  private readonly deserializeImageSource = (source: GiphySource): ImageSource => ({
    url: this.sanitizeUrl(source.url),
    mp4: this.sanitizeUrl(source.mp4),
    webp: this.sanitizeUrl(source.webp),
    height: source.height,
    width: source.width,
  });

  private sanitizeUrl(url: string | undefined): SafeUrl | undefined {
    return !!url && this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

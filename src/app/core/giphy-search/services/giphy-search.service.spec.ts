import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { ImageSearchResponse } from '../../image-search';
import { GiphySearchResponse } from '../models';
import { GiphyConfiguration } from '../models/giphy-configuration';
import { GiphySearchService } from './giphy-search.service';

describe('GiphySearchService', () => {
  const config: GiphyConfiguration = { apiUrl: 'test.api', language: 'en' };

  let service: GiphySearchService;
  let httpTestingController: HttpTestingController;
  let domSanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientTestingModule],
      providers: [GiphySearchService, { provide: GiphyConfiguration, useValue: config }],
    });

    service = TestBed.inject(GiphySearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search should call api endpoint and convert giphy response to image response', () => {
    spyOn(domSanitizer, 'bypassSecurityTrustUrl').and.returnValue('sanitized');

    service.search('test', 2, 25).subscribe(result => expect(result).toEqual(imageResponse));

    const req = httpTestingController.expectOne('test.api/gifs/search?api_key=&limit=25&rating=G&lang=en&q=test&offset=50');
    expect(req.request.method).toBe('GET');
    req.flush(giphyResponse);

    httpTestingController.verify();
  });
});

const imageResponse: ImageSearchResponse = {
  images: [
    {
      id: 'a',
      title: 'A',
      created: new Date('2020-06-15'),
      source: 'a',
      images: {
        original: { url: 'sanitized', mp4: 'sanitized', webp: 'sanitized', width: 400, height: 400 },
        medium: { url: undefined, mp4: undefined, webp: undefined, width: 200, height: 200 },
        small: { url: undefined, mp4: undefined, webp: undefined, width: 100, height: 100 },
      },
    },
  ],
  pagination: { count: 1, offset: 3, total: 100 },
};

const giphyResponse: GiphySearchResponse = {
  data: [
    {
      id: 'a',
      title: 'A',
      source: 'a',
      import_datetime: '2020-06-15',
      images: {
        original: { url: 'url', mp4: 'mp4', webp: 'webp', height: 400, width: 400 },
        fixed_height_small: { url: '', mp4: '', webp: '', height: 100, width: 100 },
        fixed_height: { url: '', mp4: '', webp: '', height: 200, width: 200 },
      },
    },
  ],
  pagination: { count: 1, offset: 3, total_count: 100 },
  meta: { status: 200, msg: 'OK', response_id: '123' },
};

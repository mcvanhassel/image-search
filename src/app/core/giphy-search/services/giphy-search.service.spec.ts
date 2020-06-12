import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GiphyConfiguration } from '../models/giphy-configuration';
import { GiphySearchService } from './giphy-search.service';

describe('GiphySearchService', () => {
  let service: GiphySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphySearchService, GiphyConfiguration],
    });
    service = TestBed.inject(GiphySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

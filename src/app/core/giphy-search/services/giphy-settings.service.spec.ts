import { TestBed } from '@angular/core/testing';

import { Rating } from '../models';
import { GiphySettingsService } from './giphy-settings.service';

describe('GiphySettingsService', () => {
  let service: GiphySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiphySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('apiKey', () => {
    it('should be undefined by default', () => {
      expect(service.apiKey).toBeUndefined();
    });

    it('should be assigned and emitted', () => {
      service.setApiKey('123');

      const expected = '123';
      expect(service.apiKey).toBe(expected);
      service.apiKey$.subscribe(apiKey => expect(apiKey).toBe(expected));
    });
  });

  describe('rating', () => {
    it('should be "G" by default', () => {
      expect(service.rating).toBe(Rating.G);
    });

    it('should be assigned and emitted', () => {
      service.setRating(Rating.PG13);

      const expected: Rating = Rating.PG13;
      expect(service.rating).toBe(expected);
      service.rating$.subscribe(rating => expect(rating).toBe(expected));
    });
  });
});

import { TestBed } from '@angular/core/testing';

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
});

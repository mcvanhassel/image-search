import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GiphySettingsService } from '../services/giphy-settings.service';
import { ApiKeyGuard } from './api-key.guard';

class TestComponent {}

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let router: Router;
  let imageSettingsService: GiphySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'search/settings', component: TestComponent }])],
    });

    guard = TestBed.inject(ApiKeyGuard);
    router = TestBed.inject(Router);
    imageSettingsService = TestBed.inject(GiphySettingsService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should continue navigation when api key is set', () => {
    spyOnProperty(imageSettingsService, 'apiKey$').and.returnValue(of('0123456789'));

    guard.canActivate().subscribe(canActivate => expect(canActivate).toBe(true));
  });

  it('should redirect route when api key is not set', () => {
    spyOn(router, 'parseUrl');
    spyOnProperty(imageSettingsService, 'apiKey$').and.returnValue(of(null));

    guard.canActivate().subscribe(() => expect(router.parseUrl).toHaveBeenCalledWith('/search/settings'));
  });
});

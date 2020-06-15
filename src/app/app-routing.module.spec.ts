import { Location } from '@angular/common';
import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSectionModule } from './common/hero-section';
import { CensoredWordsToken } from './core/censored-words';
import { GiphySettingsService } from './core/giphy-search';
import { ImageSearchService, ImageSearchServiceToken } from './core/image-search';

class MockImageSearchService implements ImageSearchService {
  search() {
    return of({ images: [], pagination: { count: 10, offset: 0, total: 100 } });
  }
}

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), MatCardModule, HeroSectionModule],
      providers: [
        { provide: ImageSearchServiceToken, useClass: MockImageSearchService },
        { provide: CensoredWordsToken, useValue: [] },
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    TestBed.createComponent(AppComponent);
    new NgZone({}).run(() => router.initialNavigation());
  });

  beforeEach(() => (zone = new NgZone({})));

  it('should redirect to "welcome" when navigating to ""', async () => {
    await zone.run(() => router.navigate(['']));
    expect(location.path()).toBe('/welcome');
  });

  it('should navigate to "welcome"', async () => {
    await zone.run(() => router.navigate(['/welcome']));
    expect(location.path()).toBe('/welcome');
  });

  it('should redirect to "search/settings" when navigating to "search"', async () => {
    await zone.run(() => router.navigate(['/search']));
    expect(location.path()).toBe('/search/settings');
  });

  it('should redirect to "search/settings" when navigating to "search/query"', async () => {
    await zone.run(() => router.navigate(['/search/query']));
    expect(location.path()).toBe('/search/settings');
  });

  it('should navigate to "search/query"', async () => {
    const settingsService = TestBed.inject(GiphySettingsService);
    spyOnProperty(settingsService, 'apiKey$').and.returnValue(of('123'));

    await zone.run(() => router.navigate(['/search/query']));
    expect(location.path()).toBe('/search/query');
  });

  it('should navigate to "not-found"', async () => {
    await zone.run(() => router.navigate(['/not-found']));
    expect(location.path()).toBe('/not-found');
  });

  it('should redirect to "not-found" when navigating to non-existing route', async () => {
    await zone.run(() => router.navigate(['/test']));
    expect(location.path()).toBe('/not-found');
  });
});

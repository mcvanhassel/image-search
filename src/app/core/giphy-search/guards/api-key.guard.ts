import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { GiphySettingsService } from '../services/giphy-settings.service';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly imageSettingsService: GiphySettingsService) {}

  canActivate(): Observable<UrlTree | boolean> {
    return this.imageSettingsService.apiKey$.pipe(
      map(apiKey => (!!apiKey ? true : this.router.parseUrl('/search/settings'))),
      first()
    );
  }
}

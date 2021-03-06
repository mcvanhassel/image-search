import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Rating } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GiphySettingsService {
  private readonly apiKeySubject = new BehaviorSubject<string | undefined>(undefined);
  private readonly ratingSubject = new BehaviorSubject<Rating | undefined>(Rating.G);

  get apiKey(): string | undefined {
    return this.apiKeySubject.value;
  }

  get apiKey$(): Observable<string | undefined> {
    return this.apiKeySubject.asObservable();
  }

  setApiKey(apiKey: string): void {
    this.apiKeySubject.next(apiKey);
  }

  get rating(): Rating | undefined {
    return this.ratingSubject.value;
  }

  get rating$(): Observable<Rating | undefined> {
    return this.ratingSubject.asObservable();
  }

  setRating(rating: Rating): void {
    this.ratingSubject.next(rating);
  }
}

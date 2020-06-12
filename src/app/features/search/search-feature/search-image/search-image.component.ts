import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';

import { noProfanityValidator } from '../../../../common/validators/no-profanity.validator';
import { GiphySettingsService } from '../../../../core/giphy-search/services/giphy-settings.service';
import { ImageSearchService, ImageSearchServiceToken } from '../../../../core/image-search';
import { ImageSearchResponse } from '../../../../core/image-search/image-search-response';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss'],
})
export class SearchImageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  searchControl = new FormControl('', { validators: [Validators.required, noProfanityValidator] });
  pageSize$!: Observable<number | undefined>;
  imageSearchResponse$!: Observable<ImageSearchResponse | undefined>;
  errorResponseMessage: string | undefined;

  get errorMessage(): string {
    if (this.searchControl.hasError('required')) {
      return 'Please enter a search query so that we can get to work :)';
    }

    return this.searchControl.hasError('profanity') ? 'Please keep it clean... No swear words or profanity allowed' : '';
  }

  constructor(
    @Inject(ImageSearchServiceToken) private readonly imageSearchService: ImageSearchService,
    private readonly imageSettingsService: GiphySettingsService
  ) {}

  private readonly subscriptions = new Subscription();
  private readonly pageIndexSubject = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    this.pageSize$ = this.imageSettingsService.limit$;

    const pageIndexChanges$ = this.pageIndexSubject.pipe(distinctUntilChanged());
    const searchQueryChanges$ = this.searchControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(500));

    this.subscriptions.add(searchQueryChanges$.subscribe(() => this.paginator?.firstPage()));

    this.imageSearchResponse$ = combineLatest([searchQueryChanges$, pageIndexChanges$]).pipe(
      tap(() => (this.errorResponseMessage = '')),
      filter(() => this.searchControl.valid),
      switchMap(([query, pageIndex]) => this.imageSearchService.search(query, pageIndex)),
      catchError(err => {
        this.errorResponseMessage = err.error.message;
        return throwError(err);
      }),
      shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPageChanged(event: PageEvent): void {
    this.pageIndexSubject.next(event.pageIndex);
  }
}

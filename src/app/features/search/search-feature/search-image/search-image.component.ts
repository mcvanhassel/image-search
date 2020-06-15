import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, shareReplay, switchMap } from 'rxjs/operators';

import { CensoredWordsValidator } from '../../../../core/censored-words';
import { ImageSearchResponse, ImageSearchService, ImageSearchServiceToken } from '../../../../core/image-search';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss'],
})
export class SearchImageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  pageSize: number = 20;
  searchControl = new FormControl('', [Validators.required, this.censoredWordsValidator.validate()]);
  imageSearchResponse$!: Observable<ImageSearchResponse | undefined>;
  errorMessage$!: Observable<string>;

  constructor(
    @Inject(ImageSearchServiceToken) private readonly imageSearchService: ImageSearchService,
    private readonly censoredWordsValidator: CensoredWordsValidator
  ) {}

  private readonly subscriptions = new Subscription();
  private readonly pageIndexSubject = new BehaviorSubject<number>(0);
  private readonly pageSizeSubject = new BehaviorSubject<number>(this.pageSize);

  ngOnInit(): void {
    const pageIndexChanges$ = this.pageIndexSubject.pipe(distinctUntilChanged());
    const pageSizeChanges$ = this.pageSizeSubject.pipe(distinctUntilChanged());
    const searchQueryChanges$ = this.searchControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(500));

    this.subscriptions.add(searchQueryChanges$.subscribe(() => this.paginator?.firstPage()));

    this.imageSearchResponse$ = combineLatest([searchQueryChanges$, pageIndexChanges$, pageSizeChanges$]).pipe(
      filter(() => this.searchControl.valid),
      switchMap(([query, pageIndex, pageSize]) => this.imageSearchService.search(query, pageIndex, pageSize)),
      shareReplay(1)
    );

    this.errorMessage$ = this.imageSearchResponse$.pipe(
      catchError(err => of(err.error.message)),
      filter((errorMessage: string) => errorMessage?.length > 0)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPageChanged(event: PageEvent): void {
    this.pageSizeSubject.next(event.pageSize);
    this.pageIndexSubject.next(event.pageIndex);
  }
}

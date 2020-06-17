import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { HeroSectionModule } from '../../../../common/hero-section';
import { ImageGridModule } from '../../../../common/image-grid';
import { CensoredWordsToken } from '../../../../core/censored-words';
import { ImageSearchService, ImageSearchServiceToken } from '../../../../core/image-search';
import { SearchImageComponent } from './search-image.component';

const imageSearchResponse = { images: [], pagination: { count: 20, offset: 0, total: 100 } };

const images = [
  {
    id: 'test',
    title: 'Test',
    created: new Date('2020-06-17'),
    source: 'test',
    images: {
      original: { url: 'sanitized', mp4: 'sanitized', webp: 'sanitized', width: 350, height: 350 },
      medium: { url: undefined, mp4: undefined, webp: undefined, width: 250, height: 250 },
      small: { url: undefined, mp4: undefined, webp: undefined, width: 120, height: 120 },
    },
  },
];

class MockImageSearchService implements ImageSearchService {
  search() {
    return of(imageSearchResponse);
  }
}

describe('SearchImageComponent', () => {
  let component: SearchImageComponent;
  let fixture: ComponentFixture<SearchImageComponent>;
  let loader: HarnessLoader;
  let input: MatInputHarness;
  let paginator: MatPaginatorHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        HeroSectionModule,
        ImageGridModule,
      ],
      declarations: [SearchImageComponent],
      providers: [
        { provide: ImageSearchServiceToken, useClass: MockImageSearchService },
        { provide: CensoredWordsToken, useValue: ['forbidden'] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    input = await loader.getHarness(MatInputHarness);
    paginator = await loader.getHarness(MatPaginatorHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pageSize should have default value', () => {
    expect(component.pageSize).toBe(20);
  });

  describe('Search control', () => {
    it('should have no default value', async () => {
      expect(await input.getValue()).toBe('');
      expect(component.searchControl.value).toBe('');
    });

    it('should be invalid and show error if touched and no value', async () => {
      await input.focus();
      await input.blur();

      expect(component.searchControl.invalid).toBeTrue();
      const errorElement = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorElement.nativeElement.textContent).toBe('Please enter a search query so that we can get to work :)');
    });

    it('should be invalid and show error if value contains censored word', async () => {
      await input.focus();
      await input.setValue('forbidden');
      await input.blur();

      expect(component.searchControl.invalid).toBeTrue();
      const errorElement = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorElement.nativeElement.textContent).toBe('Please keep it clean... No swear words or profanity allowed');
    });

    it('should be valid and show no error if allowed value set', async () => {
      await input.focus();
      await input.setValue('puppies');
      await input.blur();

      expect(component.searchControl.valid).toBeTrue();
      expect(component.searchControl.value).toBe('puppies');
      const errorElement = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorElement).toBeNull();
    });
  });

  describe('Paginator', () => {
    it('should reset to first page on changing search value', async () => {
      spyOn(component.paginator, 'firstPage').and.callThrough();

      component.ngOnInit();
      await input.focus();
      await input.setValue('puppies');
      await input.blur();

      expect(component.paginator?.firstPage).toHaveBeenCalled();
    });

    it('should have pageSize', async () => {
      const pageSize = await paginator.getPageSize();
      expect(pageSize).toBe(20);
    });

    it('should have range label', async () => {
      component.ngOnInit();
      await input.focus();
      await input.setValue('puppies');
      await input.blur();

      const rangeLabel = await paginator.getRangeLabel();
      expect(rangeLabel).toBe('1 – 20 of 100');
    });
  });

  describe('Content', () => {
    it('should display start search message', async () => {
      const pElement = fixture.debugElement.query(By.css('p'));
      expect(pElement.nativeElement.textContent).toBe('Start your search by typing a word or phrase above');
    });

    it('should display empty result message', async () => {
      component.ngOnInit();
      await input.focus();
      await input.setValue('puppies');
      await input.blur();

      const pElement = fixture.debugElement.query(By.css('p'));
      expect(pElement.nativeElement.textContent).toBe('Nothing found for your search query :(');
    });

    it('should display image', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.returnValue(of({ ...imageSearchResponse, images }));

      component.ngOnInit();
      await input.focus();
      await input.setValue('puppies');
      await input.blur();

      const pictureElements = fixture.debugElement.queryAll(By.css('picture'));
      expect(pictureElements.length).toBe(1);
    });
  });

  describe('Image search API', () => {
    it('should be called on search query', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('puppies');

      expect(imageSearchService.search).toHaveBeenCalledTimes(1);
    });

    it('should be called on changing search query', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();

      await input.setValue('puppies');
      await input.setValue('test');

      expect(imageSearchService.search).toHaveBeenCalledTimes(2);
    });

    it('should not be called on entering censored search query', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('forbidden');

      expect(imageSearchService.search).toHaveBeenCalledTimes(0);
    });

    it('should not be called on clearing search query', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('puppies');
      await input.setValue('');

      expect(imageSearchService.search).toHaveBeenCalledTimes(1);
    });

    it('should be called on changing page index', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('puppies');
      component.onPageChanged({ pageIndex: 1, pageSize: 20, length: 20 });

      expect(imageSearchService.search).toHaveBeenCalledTimes(2);
    });

    it('should be called on changing page size', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('puppies');
      component.onPageChanged({ pageIndex: 0, pageSize: 5, length: 20 });

      expect(imageSearchService.search).toHaveBeenCalledTimes(2);
    });

    it('should be called on changing page index and page size', async () => {
      const imageSearchService = TestBed.inject(ImageSearchServiceToken);
      spyOn(imageSearchService, 'search').and.callThrough();

      component.ngOnInit();
      await input.setValue('puppies');
      component.onPageChanged({ pageIndex: 1, pageSize: 5, length: 20 });

      expect(imageSearchService.search).toHaveBeenCalledTimes(3);
    });
  });
});

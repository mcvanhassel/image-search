import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CensoredWordsToken } from '../../../../core/censored-words';
import { ImageSearchService, ImageSearchServiceToken } from '../../../../core/image-search';
import { SearchImageComponent } from './search-image.component';

class MockImageSearchService implements ImageSearchService {
  search() {
    return of({ images: [], pagination: { count: 10, offset: 0, total: 100 } });
  }
}

describe('SearchImageComponent', () => {
  let component: SearchImageComponent;
  let fixture: ComponentFixture<SearchImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchImageComponent],
      providers: [
        { provide: ImageSearchServiceToken, useClass: MockImageSearchService },
        { provide: CensoredWordsToken, useValue: ['forbidden'] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { HeroSectionModule } from '../../../../common/hero-section';
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
      imports: [NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, HeroSectionModule],
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

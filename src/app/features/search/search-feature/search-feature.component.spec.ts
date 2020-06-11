import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFeatureComponent } from './search-feature.component';

describe('SearchFeatureComponent', () => {
  let component: SearchFeatureComponent;
  let fixture: ComponentFixture<SearchFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

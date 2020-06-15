import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroSectionModule } from '../../../common/hero-section';
import { NotFoundFeatureComponent } from './not-found-feature.component';

describe('NotFoundFeatureComponent', () => {
  let component: NotFoundFeatureComponent;
  let fixture: ComponentFixture<NotFoundFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatButtonModule, HeroSectionModule],
      declarations: [NotFoundFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

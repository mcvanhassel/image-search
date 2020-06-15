import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroSectionModule } from '../../../common/hero-section';
import { WelcomeFeatureComponent } from './welcome-feature.component';

describe('WelcomeFeatureComponent', () => {
  let component: WelcomeFeatureComponent;
  let fixture: ComponentFixture<WelcomeFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatButtonModule, HeroSectionModule],
      declarations: [WelcomeFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

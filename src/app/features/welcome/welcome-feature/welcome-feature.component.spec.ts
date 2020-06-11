import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFeatureComponent } from './welcome-feature.component';

describe('WelcomeFeatureComponent', () => {
  let component: WelcomeFeatureComponent;
  let fixture: ComponentFixture<WelcomeFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundFeatureComponent } from './not-found-feature.component';

describe('NotFoundFeatureComponent', () => {
  let component: NotFoundFeatureComponent;
  let fixture: ComponentFixture<NotFoundFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundFeatureComponent ]
    })
    .compileComponents();
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

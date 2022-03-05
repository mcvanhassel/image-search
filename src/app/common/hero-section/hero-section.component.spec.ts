import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  const heroTitle = 'Hero Title';
  const heroText = 'Hero text.';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display title', () => {
    component.title = heroTitle;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent).toBe(heroTitle);
    expect(titleElement.nativeElement.innerHTML).toBe(heroTitle);
  });

  it('Should display title as html', () => {
    component.title = '<span>Hero Title</span>';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent).toBe(heroTitle);
    expect(titleElement.nativeElement.innerHTML).toBe('<span>Hero Title</span>');
  });

  it('Should display no text', () => {
    fixture.detectChanges();

    const textElement = fixture.debugElement.query(By.css('p'));
    expect(textElement).toBeNull();
  });

  it('Should display text', () => {
    component.text = heroText;
    fixture.detectChanges();

    const textElement = fixture.debugElement.query(By.css('p'));
    expect(textElement.nativeElement.textContent).toBe(heroText);
    expect(textElement.nativeElement.innerHTML).toBe(heroText);
  });

  it('Should display text as html', () => {
    component.text = 'Hero <strong>text</strong>.';
    fixture.detectChanges();

    const textElement = fixture.debugElement.query(By.css('p'));
    expect(textElement.nativeElement.textContent).toBe(heroText);
    expect(textElement.nativeElement.innerHTML).toBe('Hero <strong>text</strong>.');
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatToolbarModule, MatIconModule],
      declarations: [NavbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu items', () => {
    const anchorElements = fixture.debugElement.queryAll(By.css('a'));
    expect(anchorElements.length).toBe(3);
    expect(anchorElements[0].nativeElement.textContent).toContain('Welcome');
    expect(anchorElements[1].nativeElement.textContent).toContain('Search');
    expect(anchorElements[2].nativeElement.textContent).toContain('Settings');
  });
});

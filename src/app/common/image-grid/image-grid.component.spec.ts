import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageGridComponent } from './image-grid.component';

describe('ImageGridComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display images', () => {
    component.images = images;
    fixture.detectChanges();

    const pictureElements = fixture.debugElement.queryAll(By.css('picture'));
    expect(pictureElements.length).toBe(2);

    const imgElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imgElements.length).toBe(2);
    expect(imgElements[0].nativeElement.outerHTML).toContain('src="favicon.ico" alt="A"');
    expect(imgElements[1].nativeElement.outerHTML).toContain('src="favicon.ico" alt="B"');
  });
});

const url = 'favicon.ico';
const images = [
  {
    id: 'a',
    title: 'A',
    images: {
      original: { url, height: 400, width: 400 },
      small: { url, height: 100, width: 100 },
      medium: { url, height: 200, width: 200 },
    },
  },
  {
    id: 'b',
    title: 'B',
    images: {
      original: { url, height: 400, width: 400 },
      small: { url, height: 100, width: 100 },
      medium: { url, height: 200, width: 200 },
    },
  },
];

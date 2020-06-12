import { Component, Input } from '@angular/core';

import { Image } from '../../core/image-search';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
  @Input() images: Image[] | undefined = [];
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { HeroSectionModule } from '../../common/hero-section';
import { NotFoundFeatureComponent } from './not-found-feature/not-found-feature.component';

@NgModule({
  declarations: [NotFoundFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundFeatureComponent,
      },
    ]),

    MatButtonModule,
    HeroSectionModule,
  ],
})
export class NotFoundModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { HeroSectionModule } from '../../common/hero-section';
import { WelcomeFeatureComponent } from './welcome-feature/welcome-feature.component';

@NgModule({
  declarations: [WelcomeFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WelcomeFeatureComponent,
      },
    ]),

    MatButtonModule,
    HeroSectionModule,
  ],
})
export class WelcomeModule {}

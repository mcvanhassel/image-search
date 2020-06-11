import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { WelcomeFeatureComponent } from './welcome-feature/welcome-feature.component';

@NgModule({
  declarations: [WelcomeFeatureComponent],
  imports: [CommonModule, MatButtonModule, RouterModule.forChild([{ path: '', component: WelcomeFeatureComponent }])],
})
export class WelcomeModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NotFoundFeatureComponent } from './not-found-feature/not-found-feature.component';

@NgModule({
  declarations: [NotFoundFeatureComponent],
  imports: [CommonModule, MatButtonModule, RouterModule.forChild([{ path: '', component: NotFoundFeatureComponent }])],
})
export class NotFoundModule {}

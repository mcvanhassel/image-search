import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchFeatureComponent } from './search-feature/search-feature.component';

@NgModule({
  declarations: [SearchFeatureComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SearchFeatureComponent }])],
})
export class SearchModule {}

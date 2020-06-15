import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { HeroSectionModule } from '../../common/hero-section';
import { ImageGridModule } from '../../common/image-grid';
import { ApiKeyGuard } from '../../core/giphy-search';
import { SearchFeatureComponent } from './search-feature/search-feature.component';
import { SearchImageComponent } from './search-feature/search-image/search-image.component';
import { SearchSettingsComponent } from './search-feature/search-settings/search-settings.component';

@NgModule({
  declarations: [SearchFeatureComponent, SearchImageComponent, SearchSettingsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchFeatureComponent,
        children: [
          { path: '', redirectTo: 'query', pathMatch: 'full' },
          { path: 'query', component: SearchImageComponent, canActivate: [ApiKeyGuard] },
          { path: 'settings', component: SearchSettingsComponent },
        ],
      },
    ]),

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,

    HeroSectionModule,
    ImageGridModule,
  ],
})
export class SearchModule {}

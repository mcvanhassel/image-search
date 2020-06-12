import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeroSectionComponent } from './hero-section.component';

@NgModule({
  declarations: [HeroSectionComponent],
  imports: [CommonModule],
  exports: [HeroSectionComponent],
})
export class HeroSectionModule {}

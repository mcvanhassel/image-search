import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Rating } from '../../../../core/giphy-search';
import { GiphySettingsService } from '../../../../core/giphy-search/services/giphy-settings.service';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss'],
})
export class SearchSettingsComponent {
  ratings = Object.keys(Rating);

  apiKeyControl = new FormControl(this.settingsService.apiKey, { validators: Validators.required });
  ratingControl = new FormControl(this.settingsService.rating, { validators: Validators.required });
  limitControl = new FormControl(this.settingsService.limit, { validators: [Validators.required, Validators.min(0), Validators.max(25)] });

  formGroup = new FormGroup({
    apiKey: this.apiKeyControl,
    rating: this.ratingControl,
    limit: this.limitControl,
  });

  constructor(private readonly settingsService: GiphySettingsService) {}

  saveSettings(): void {
    this.settingsService.setApiKey(this.apiKeyControl.value);
    this.settingsService.setLimit(this.limitControl.value);
    this.settingsService.setRating(this.ratingControl.value);
    this.formGroup.markAsPristine();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GiphySettingsService, Rating } from '../../../../core/giphy-search';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss'],
})
export class SearchSettingsComponent {
  ratings = Object.keys(Rating);

  apiKeyControl = new FormControl(this.settingsService.apiKey, { validators: Validators.required });
  ratingControl = new FormControl(this.settingsService.rating, { validators: Validators.required });

  formGroup = new FormGroup({
    apiKey: this.apiKeyControl,
    rating: this.ratingControl,
  });

  constructor(private readonly settingsService: GiphySettingsService) {}

  saveSettings(): void {
    this.settingsService.setApiKey(this.apiKeyControl.value);
    this.settingsService.setRating(this.ratingControl.value);
    this.formGroup.markAsPristine();
  }
}

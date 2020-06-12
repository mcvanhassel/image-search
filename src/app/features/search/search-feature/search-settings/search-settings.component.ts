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

  apiKeyControl = new FormControl(this.apiKeyService.apiKey, { validators: Validators.required });
  ratingControl = new FormControl(this.apiKeyService.rating, { validators: Validators.required });
  limitControl = new FormControl(this.apiKeyService.limit, { validators: [Validators.required, Validators.min(0), Validators.max(25)] });

  formGroup = new FormGroup({
    apiKey: this.apiKeyControl,
    rating: this.ratingControl,
    limit: this.limitControl,
  });

  constructor(private readonly apiKeyService: GiphySettingsService) {}

  saveSettings(): void {
    this.apiKeyService.setApiKey(this.apiKeyControl.value);
    this.apiKeyService.setLimit(this.limitControl.value);
    this.apiKeyService.setRating(this.ratingControl.value);
    this.formGroup.markAsPristine();
  }
}

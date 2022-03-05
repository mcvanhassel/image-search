import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HeroSectionModule } from '../../../../common/hero-section';
import { GiphySettingsService, Rating } from '../../../../core/giphy-search';
import { SearchSettingsComponent } from './search-settings.component';

describe('SearchSettingsComponent', () => {
  let component: SearchSettingsComponent;
  let fixture: ComponentFixture<SearchSettingsComponent>;
  let loader: HarnessLoader;
  let input: MatInputHarness;
  let saveButton: MatButtonHarness;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,

        HeroSectionModule,
      ],
      providers: [GiphySettingsService],
      declarations: [SearchSettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSettingsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    input = await loader.getHarness(MatInputHarness);
    saveButton = await loader.getHarness(MatButtonHarness.with({ text: 'Save' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('API Key control', () => {
    it('should have no default value', async () => {
      expect(await input.getValue()).toBe('');
      expect(component.apiKeyControl.value).toBeNull();
    });

    it('should be invalid and show error if touched and no value', async () => {
      await input.focus();
      await input.blur();

      expect(component.apiKeyControl.invalid).toBeTrue();
      const errorElement = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorElement.nativeElement.textContent).toBe('API Key is required');
    });

    it('should be valid and show no error if value set and blurred', async () => {
      await input.focus();
      await input.setValue('123');
      await input.blur();

      expect(component.apiKeyControl.valid).toBeTrue();
      expect(component.apiKeyControl.value).toBe('123');
      const errorElement = fixture.debugElement.query(By.css('.mat-error'));
      expect(errorElement).toBeNull();
    });
  });

  describe('Rating control', () => {
    let select: MatSelectHarness;

    beforeEach(async () => {
      select = await loader.getHarness(MatSelectHarness);
    });

    it('should have ratings list', async () => {
      expect(component.ratings).toEqual([Rating.G, Rating.PG, Rating.PG13, Rating.R]);
    });

    it('should have "G" as default value', async () => {
      const expected = Rating.G;
      expect(await select.getValueText()).toBe(expected);
      expect(component.ratingControl.value).toBe(expected);
    });

    it('should have select options', async () => {
      await select.open();
      const options = await select.getOptions();
      const optionsText = await Promise.all(options.map(async option => option.getText()));
      expect(optionsText).toEqual([Rating.G, Rating.PG, Rating.PG13, Rating.R]);
    });

    it('should select option', async () => {
      await select.open();
      await select.clickOptions({ text: Rating.PG13 });
      const expected = Rating.PG13;
      expect(await select.getValueText()).toBe(expected);
      expect(component.ratingControl.value).toBe(expected);
    });
  });

  describe('Save button', () => {
    it('should be disabled if API Key has no value', async () => {
      await input.focus();
      await input.setValue('');
      await input.blur();

      expect(await saveButton.isDisabled()).toBeTrue();
    });

    it('should be enabled if value set', async () => {
      await input.focus();
      await input.setValue('123');
      await input.blur();

      expect(await saveButton.isDisabled()).toBeFalse();
    });

    it('should save settings on click and mark form as pristine', async () => {
      const settingsService = TestBed.inject(GiphySettingsService);
      spyOn(settingsService, 'setApiKey').and.callThrough();
      spyOn(settingsService, 'setRating').and.callThrough();
      spyOn(component, 'saveSettings').and.callThrough();
      spyOn(component.formGroup, 'markAsPristine').and.callThrough();

      await input.focus();
      await input.setValue('123');
      await input.blur();
      await saveButton.click();

      expect(component.saveSettings).toHaveBeenCalled();
      expect(settingsService.setApiKey).toHaveBeenCalledWith('123');
      expect(settingsService.setRating).toHaveBeenCalledWith(Rating.G);
      expect(component.formGroup.markAsPristine).toHaveBeenCalled();
    });
  });
});

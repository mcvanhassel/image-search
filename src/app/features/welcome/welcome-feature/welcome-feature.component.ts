import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-feature',
  templateUrl: './welcome-feature.component.html',
  styleUrls: ['./welcome-feature.component.scss'],
})
export class WelcomeFeatureComponent {
  heroTitle = 'Welcome to <strong>Gif me Inspiration</strong>';
  heroText = `
    How's your mood today? Want to express yourself through pictures?
    Please allow us to inspire you! :)
    You'll only have to guide us by typing in some nice words that pop in to your head. We'll do the rest. Promise.
    Just please make sure that you've entered your GIPHY API Key on our settings page.
  `;
}

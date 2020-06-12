import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-feature',
  templateUrl: './not-found-feature.component.html',
  styleUrls: ['./not-found-feature.component.scss'],
})
export class NotFoundFeatureComponent {
  heroTitle = 'Page not found';
  heroText = `
    Sorry, the page you are looking for doesn't seem to exist.
    Do you want us to greet you again on our welcome page?
  `;
}

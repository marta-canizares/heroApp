import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet><app-heropage></app-heropage></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hero App';
}

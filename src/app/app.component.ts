import { Component } from '@angular/core';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [DeviceListComponent],
  template: `
    <h1>Device Management</h1>
    <app-device-list></app-device-list>
  `,
})
export class AppComponent {
  protected title = 'fornax-test';
}

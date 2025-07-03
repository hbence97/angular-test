import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { DeviceFormComponent } from '../device-form/device-form.component';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DeleteButtonComponent,
    DeviceFormComponent,
  ],
  template: `
    <app-device-form
      (deviceAdded)="handleDeviceAdded($event)"
    ></app-device-form>
    <div class="device-container">
      <div class="header-section">
        <h1 class="title">Devices</h1>
        <p class="subtitle">Manage and track your devices</p>
      </div>

      <div class="table-card">
        <p-table
          [value]="devices"
          [tableStyle]="{ 'min-width': '50rem' }"
          styleClass="p-datatable-gridlines p-datatable-striped"
          [paginator]="true"
          [rows]="10"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Showing {first} - {last} of {totalRecords} devices"
        >
          <ng-template pTemplate="header">
            <tr>
              <th class="name-column">
                <div class="column-header">
                  <i class="pi pi-desktop"></i>
                  <span>Device Name</span>
                </div>
              </th>
              <th class="type-column">
                <div class="column-header">
                  <i class="pi pi-tag"></i>
                  <span>Type</span>
                </div>
              </th>
              <th class="status-column">
                <div class="column-header">
                  <i class="pi pi-circle"></i>
                  <span>Status</span>
                </div>
              </th>
              <th class="location-column">
                <div class="column-header">
                  <i class="pi pi-map-marker"></i>
                  <span>Location</span>
                </div>
              </th>
              <th class="actions-column">
                <div class="column-header">
                  <i class="pi pi-cog"></i>
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-device>
            <tr class="device-row">
              <td class="device-name">
                <div class="device-info">
                  <i class="pi" [ngClass]="getDeviceIcon(device.type)"></i>
                  <span class="name-text">{{ device.name }}</span>
                </div>
              </td>
              <td class="device-type">
                <span class="type-badge">{{ device.type }}</span>
              </td>
              <td class="device-status">
                <span
                  class="status-indicator"
                  [ngClass]="'status-' + device.status.toLowerCase()"
                >
                  <i class="pi pi-circle-fill status-dot"></i>
                  <span>{{
                    device.status === 'Active' ? 'Active' : 'Inactive'
                  }}</span>
                </span>
              </td>
              <td class="device-location">
                <span class="location-text">{{ device.location }}</span>
              </td>
              <td class="device-actions">
                <div class="action-buttons">
                  <app-delete-button
                    [device]="device"
                    (delete)="handleDelete($event)"
                  ></app-delete-button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: [
    `
      .device-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .header-section {
        margin-bottom: 2rem;
      }

      .title {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      .subtitle {
        font-size: 1.1rem;
        margin: 0;
        font-weight: 400;
      }

      .table-card {
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .column-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
      }

      .column-header i {
        font-size: 0.9rem;
      }

      .device-row {
        transition: all 0.2s ease;
      }

      .device-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .device-info i {
        font-size: 1.1rem;
        width: 20px;
        text-align: center;
      }

      .name-text {
        font-weight: 600;
      }

      .type-badge {
        padding: 0.35rem 0.75rem;
      }

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
      }

      .status-dot {
        font-size: 0.6rem;
      }

      .status-active .status-dot {
        color: green;
      }

      .status-inactive .status-dot {
        color: red;
      }

      .action-buttons {
        display: flex;
        gap: 0.25rem;
        justify-content: flex-start;
      }
    `,
  ],
})
export class DeviceListComponent implements OnInit {
  devices: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('http://localhost:3000/devices')
      .subscribe((response) => {
        this.devices = response.data;
        console.log('Devices loaded: ', this.devices);
      });
  }

  handleDelete(device: any) {
    this.devices = this.devices.filter((d) => d.id !== device.id);
    console.log('Device deleted: ', device);
  }

  handleDeviceAdded(device: any) {
    this.http.post('http://localhost:3000/devices', device).subscribe({
      next: (res: any) => {
        this.devices.push(res.data);
        console.log('Device added: ', res.data);
      },
      error: (err) => {
        console.error('Failed to add device:', err);
      },
    });
  }

  getDeviceIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'laptop':
        return 'pi-desktop';
      case 'printer':
        return 'pi-print';
      case 'network':
        return 'pi-wifi';
      case 'mobile':
        return 'pi-mobile';
      default:
        return 'pi-circle';
    }
  }
}

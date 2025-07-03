import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  template: `
    <form [formGroup]="deviceForm" (ngSubmit)="submit()" class="device-form">
      <input formControlName="name" placeholder="Device Name" />
      <input formControlName="type" placeholder="Type" />
      <input formControlName="ip" placeholder="IP" />
      <select formControlName="status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input formControlName="location" placeholder="Location" />
      <button
        pButton
        type="submit"
        label="Add Device"
        [disabled]="deviceForm.invalid"
      ></button>
    </form>
  `,
  styles: [
    `
      .device-form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }
      input,
      select {
        padding: 0.5rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class DeviceFormComponent {
  @Output() deviceAdded = new EventEmitter<any>();

  deviceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    ip: new FormControl('', Validators.required),
    status: new FormControl('Active', Validators.required),
    location: new FormControl('', Validators.required),
  });

  submit() {
    if (this.deviceForm.valid) {
      this.deviceAdded.emit(this.deviceForm.value);
      this.deviceForm.reset({ status: 'Active' });
    }
  }
}

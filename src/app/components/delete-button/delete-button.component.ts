import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      icon="pi pi-trash"
      severity="danger"
      size="small"
      [text]="true"
      [rounded]="true"
      class="action-btn delete-btn"
      (onClick)="onDelete()"
    ></p-button>
  `,
  styles: [``],
})
export class DeleteButtonComponent {
  @Input() device: any;
  @Output() delete = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  onDelete() {
    this.http
      .delete(`http://localhost:3000/devices/${this.device.id}`)
      .subscribe({
        next: () => {
          console.log('Deleted on server:', this.device.id);
          this.delete.emit(this.device);
        },
        error: (error) => {
          console.error('Delete failed', error);
        },
      });
  }
}

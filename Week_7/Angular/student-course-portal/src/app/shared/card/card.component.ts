import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="{'card--elevated': elevated}" [ngStyle]="{'border-color': borderColor}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    }
    .card:hover {
      border-color: #10b981;
      box-shadow: 0 4px 12px -2px rgba(16, 185, 129, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    }
    .card--elevated {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
  `]
})
export class CardComponent {
  @Input() elevated = false;
  @Input() borderColor = '#e2e8f0';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-overlay" *ngIf="loadingService.loading$ | async">
      <div class="spinner-box">
        <div class="spinner-circle"></div>
        <p class="loading-text">Loading Data...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(255, 255, 255, 0.8); display: flex;
      align-items: center; justify-content: center; z-index: 9999;
      backdrop-filter: blur(2px);
    }
    .spinner-box {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      background: #ffffff; padding: 24px 36px; border-radius: 12px;
      border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
    }
    .spinner-circle {
      width: 32px; height: 32px; border: 3px solid #e2e8f0;
      border-top-color: #059669; border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .loading-text { color: #334155; margin: 0; font-size: 13px; font-weight: 600; }
  `]
})
export class LoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}

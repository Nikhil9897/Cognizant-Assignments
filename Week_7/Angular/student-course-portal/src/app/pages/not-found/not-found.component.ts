import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  template: `
    <div class="not-found-page">
      <app-card>
        <div class="not-found-content">
          <span class="error-code">404</span>
          <h1>Page Not Found</h1>
          <p>The requested route does not exist in the Student Course Portal.</p>
          <a routerLink="/" class="btn-home">Return to Home Overview</a>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .not-found-page {
      display: flex; justify-content: center; align-items: center; min-height: 55vh; text-align: center;
    }
    .not-found-content { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 24px; }
    .error-code { font-size: 64px; font-weight: 900; color: #059669; letter-spacing: 2px; line-height: 1; }
    .not-found-content h1 { color: #0f172a; margin: 0; font-size: 22px; }
    .not-found-content p { color: #64748b; font-size: 13.5px; max-width: 380px; margin: 0; }
    .btn-home {
      background: #059669; color: #fff; text-decoration: none; padding: 9px 20px;
      border-radius: 6px; font-weight: 600; margin-top: 8px; font-size: 13px; transition: background 0.2s;
    }
    .btn-home:hover { background: #047857; }
  `]
})
export class NotFoundComponent {}

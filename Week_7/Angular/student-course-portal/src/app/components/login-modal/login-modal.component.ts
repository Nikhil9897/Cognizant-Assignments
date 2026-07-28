import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-card">
        <button class="close-btn" (click)="close()">✕</button>

        <h2 class="modal-title">Log in or create account</h2>
        <p class="modal-sub">Learn on your own time from top universities and businesses.</p>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="loginEmail">Email *</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              [(ngModel)]="email"
              required
              class="form-control"
              placeholder="name@email.com" />
          </div>

          <div class="form-group" *ngIf="showPassword">
            <label for="loginPassword">Password *</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              [(ngModel)]="password"
              required
              class="form-control"
              placeholder="Enter your password" />
          </div>

          <div class="error-alert" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="!email" class="btn-continue">
            {{ showPassword ? (isLoading ? 'Authenticating...' : 'Log In') : 'Continue' }}
          </button>
        </form>

        <div class="divider-row">
          <span class="divider-line"></span>
          <span class="divider-text">or</span>
          <span class="divider-line"></span>
        </div>

        <div class="social-buttons">
          <button class="social-btn" (click)="quickLoginAsMilind()">
            <span class="social-icon google-icon">G</span>
            <span>Continue with Google</span>
          </button>

          <button class="social-btn" (click)="quickLoginAsMilind()">
            <span class="social-icon fb-icon">f</span>
            <span>Continue with Facebook</span>
          </button>

          <button class="social-btn" (click)="quickLoginAsMilind()">
            <span class="social-icon apple-icon"></span>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div class="org-link">
          <a (click)="quickLoginAsMilind()">Sign up with your organization</a>
        </div>

        <div class="terms-footer">
          I accept Coursera's <a href="#">Terms of Use</a> and <a href="#">Privacy Notice</a>. Having trouble logging in? <a href="#">Learner help center</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.45); display: flex; align-items: center; justify-content: center;
      z-index: 1000; backdrop-filter: blur(2px);
    }
    .modal-card {
      background: #ffffff; border-radius: 16px;
      padding: 36px 40px; width: 440px; max-width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      position: relative;
    }
    .close-btn {
      position: absolute; top: 20px; right: 24px;
      background: transparent; border: none; font-size: 20px; color: #1f1f1f; cursor: pointer;
    }
    .modal-title { margin: 0 0 6px 0; font-size: 24px; font-weight: 700; color: #1f1f1f; letter-spacing: -0.5px; }
    .modal-sub { font-size: 14px; color: #525252; margin: 0 0 24px 0; line-height: 1.45; }

    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .form-group label { color: #1f1f1f; font-size: 13.5px; font-weight: 700; }
    .form-control {
      background: #ffffff; border: 1px solid #757575; color: #1f1f1f; padding: 12px 14px;
      border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s;
    }
    .form-control:focus { border-color: #0056d2; box-shadow: 0 0 0 2px rgba(0,86,210,0.2); }

    .error-alert { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 12.5px; margin-bottom: 12px; }

    .btn-continue {
      width: 100%; background: #0056d2; border: none; color: #ffffff;
      padding: 12px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer;
      margin-top: 8px; transition: background 0.2s;
    }
    .btn-continue:hover { background: #00419e; }
    .btn-continue:disabled { opacity: 0.5; cursor: not-allowed; }

    .divider-row { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
    .divider-line { flex: 1; height: 1px; background: #e1e6ed; }
    .divider-text { font-size: 13px; color: #6e6e6e; }

    .social-buttons { display: flex; flex-direction: column; gap: 10px; }
    .social-btn {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      width: 100%; background: #ffffff; border: 1px solid #1f1f1f; border-radius: 8px;
      padding: 10px; font-size: 14px; font-weight: 700; color: #1f1f1f; cursor: pointer;
      transition: background 0.2s;
    }
    .social-btn:hover { background: #f5f7fa; }

    .social-icon { font-weight: 800; font-size: 16px; width: 20px; text-align: center; }
    .google-icon { color: #ea4335; }
    .fb-icon { color: #1877f2; }
    .apple-icon { color: #000000; }

    .org-link { text-align: center; margin-top: 16px; }
    .org-link a { color: #0056d2; text-decoration: underline; font-size: 13.5px; font-weight: 600; cursor: pointer; }

    .terms-footer { font-size: 11.5px; color: #6e6e6e; text-align: center; margin-top: 20px; line-height: 1.5; }
    .terms-footer a { color: #525252; text-decoration: underline; }
  `]
})
export class LoginModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  email: string = 'milind.verma@cognizant.com';
  password: string = 'password123';
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  onLogin(): void {
    if (!this.showPassword) {
      this.showPassword = true;
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.loginWithCredentials(this.email, this.password).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.closeModal.emit();
      } else {
        this.errorMessage = res.message;
      }
    });
  }

  quickLoginAsMilind(): void {
    this.authService.loginWithCredentials('milind.verma@cognizant.com', 'password123').subscribe(() => {
      this.closeModal.emit();
    });
  }

  close(): void {
    this.closeModal.emit();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="onboarding-overlay">
      <!-- Top Navigation & Segmented Progress Bar -->
      <div class="top-nav">
        <button class="back-btn" (click)="prevStep()" [disabled]="currentStep === 1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="progress-bar-container">
          <div class="progress-segment" [class.filled]="currentStep >= 1">
            <div class="progress-fill" [style.width.%]="getSegmentWidth(1)"></div>
          </div>
          <div class="progress-segment" [class.filled]="currentStep >= 3">
            <div class="progress-fill" [style.width.%]="getSegmentWidth(2)"></div>
          </div>
          <div class="progress-segment" [class.filled]="currentStep >= 5">
            <div class="progress-fill" [style.width.%]="getSegmentWidth(3)"></div>
          </div>
        </div>

        <button class="audio-btn" (click)="toggleAudio()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>

      <!-- Main Step Container -->
      <div class="step-container">
        
        <!-- STEP 1: Welcome Screen -->
        <div class="step-view" *ngIf="currentStep === 1">
          <div class="mascot-icon">
            <div class="mascot-square"></div>
          </div>
          <h1 class="welcome-title">Hi, I'm Koji!</h1>
          <p class="welcome-subtitle">I'll be your personal tutor.</p>
        </div>

        <!-- STEP 2: Motivation Selection -->
        <div class="step-view" *ngIf="currentStep === 2">
          <div class="header-with-mascot">
            <div class="mascot-icon-sm">
              <div class="mascot-square-sm"></div>
            </div>
            <h2>What motivates you to learn?</h2>
          </div>

          <div class="cards-grid-4">
            <div
              class="option-card"
              [class.selected]="selectedMotivation === 'school'"
              (click)="selectMotivation('school')">
              <div class="card-emoji">📘</div>
              <span>Excelling in school</span>
            </div>

            <div
              class="option-card"
              [class.selected]="selectedMotivation === 'growth'"
              (click)="selectMotivation('growth')">
              <div class="card-emoji">📈</div>
              <span>Professional growth</span>
            </div>

            <div
              class="option-card"
              [class.selected]="selectedMotivation === 'sharp'"
              (click)="selectMotivation('sharp')">
              <div class="card-emoji">🎯</div>
              <span>Staying sharp</span>
            </div>

            <div
              class="option-card"
              [class.selected]="selectedMotivation === 'child'"
              (click)="selectMotivation('child')">
              <div class="card-emoji">🚀</div>
              <span>Helping my child learn</span>
            </div>
          </div>
        </div>

        <!-- STEP 3: Voice Selection -->
        <div class="step-view" *ngIf="currentStep === 3">
          <h2 class="centered-title">How do you want me to sound?</h2>
          <p class="centered-sub">Turn up your volume if you can't hear me.</p>

          <div class="cards-grid-2">
            <div
              class="voice-card"
              [class.selected]="selectedVoice === 'melodic'"
              (click)="selectVoice('melodic')">
              <div class="wave-icon">⟐</div>
              <span>Melodic</span>
            </div>

            <div
              class="voice-card"
              [class.selected]="selectedVoice === 'deep'"
              (click)="selectVoice('deep')">
              <div class="mascot-badge" *ngIf="selectedVoice === 'deep'">
                <div class="mascot-square-xs"></div>
              </div>
              <div class="wave-icon">⟐</div>
              <span>Deep</span>
            </div>
          </div>

          <div class="toggle-row">
            <span>Voice on</span>
            <label class="switch">
              <input type="checkbox" [(ngModel)]="voiceEnabled">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- STEP 4: Age Input -->
        <div class="step-view" *ngIf="currentStep === 4">
          <div class="header-with-mascot">
            <div class="mascot-icon-sm">
              <div class="mascot-square-sm"></div>
            </div>
            <h2>How old are you?</h2>
            <span class="info-circle">ⓘ</span>
          </div>

          <div class="input-wrapper">
            <input
              type="number"
              [(ngModel)]="userAge"
              placeholder="Your age"
              class="age-input" />
          </div>
        </div>

        <!-- STEP 5: Learning Subject Selection -->
        <div class="step-view" *ngIf="currentStep === 5">
          <div class="header-with-mascot-col">
            <div class="mascot-icon-sm">
              <div class="mascot-square-sm"></div>
            </div>
            <h2>What do you want to learn first?</h2>
            <p class="sub-text">You can make progress in both subjects later on</p>
          </div>

          <div class="subject-cards-grid">
            <div
              class="subject-card subject-card--math"
              [class.selected]="selectedSubject === 'math'"
              (click)="selectSubject('math')">
              <div class="subject-icon">❖</div>
              <h3>Math</h3>
            </div>

            <div
              class="subject-card"
              [class.selected]="selectedSubject === 'cs'"
              (click)="selectSubject('cs')">
              <div class="subject-icon cs-icon">⚙</div>
              <h3>Computer Science & Coding</h3>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Action Bar -->
      <div class="bottom-bar">
        <button
          class="continue-btn"
          [disabled]="!canContinue()"
          (click)="nextStep()">
          Continue
        </button>
      </div>

    </div>
  `,
  styles: [`
    .onboarding-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: #ffffff; z-index: 2000; display: flex; flex-direction: column;
      justify-content: space-between; font-family: 'Inter', system-ui, sans-serif;
    }

    /* Top Navigation */
    .top-nav {
      max-width: 1000px; margin: 0 auto; width: 100%; padding: 24px 32px 0 32px;
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .back-btn, .audio-btn {
      background: transparent; border: none; cursor: pointer; color: #1f1f1f;
      display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;
    }
    .back-btn:disabled { opacity: 0.2; cursor: default; }

    .progress-bar-container {
      flex: 1; max-width: 700px; display: flex; gap: 12px;
    }
    .progress-segment {
      flex: 1; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; background: #10b981; transition: width 0.3s ease;
    }

    /* Step Container */
    .step-container {
      flex: 1; display: flex; align-items: center; justify-content: center;
      padding: 20px 32px; max-width: 900px; margin: 0 auto; width: 100%;
    }
    .step-view {
      width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Green Mascot Icon */
    .mascot-icon {
      width: 96px; height: 96px; border-radius: 36px;
      background: linear-gradient(135deg, #10b981 0%, #a3e635 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.25); margin-bottom: 24px;
    }
    .mascot-square { width: 24px; height: 24px; background: #000000; border-radius: 4px; }

    .mascot-icon-sm {
      width: 44px; height: 44px; border-radius: 16px;
      background: linear-gradient(135deg, #10b981 0%, #a3e635 100%);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .mascot-square-sm { width: 12px; height: 12px; background: #000000; border-radius: 2px; }

    .mascot-badge {
      position: absolute; top: -14px;
      width: 32px; height: 32px; border-radius: 12px;
      background: linear-gradient(135deg, #10b981 0%, #a3e635 100%);
      display: flex; align-items: center; justify-content: center;
    }
    .mascot-square-xs { width: 8px; height: 8px; background: #000000; border-radius: 2px; }

    /* Step 1 Typography */
    .welcome-title { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }
    .welcome-subtitle { font-size: 18px; font-weight: 500; color: #0f172a; margin: 0; }

    /* Headers with Mascot */
    .header-with-mascot {
      display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
    }
    .header-with-mascot h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0; }
    .info-circle { color: #64748b; font-size: 16px; cursor: pointer; }

    .header-with-mascot-col {
      display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 36px;
    }
    .header-with-mascot-col h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0; }
    .sub-text { font-size: 14.5px; color: #64748b; margin: 0; }

    /* Cards Grid - 4 Options */
    .cards-grid-4 {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; max-width: 840px;
    }
    @media (max-width: 768px) { .cards-grid-4 { grid-template-columns: repeat(2, 1fr); } }

    .option-card {
      background: #f8fafc; border: 2px solid transparent; border-radius: 20px;
      padding: 32px 16px; display: flex; flex-direction: column; align-items: center;
      gap: 16px; cursor: pointer; transition: all 0.2s ease;
    }
    .option-card:hover { background: #ffffff; border-color: #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .option-card.selected { background: #ffffff; border-color: #10b981; box-shadow: 0 4px 16px rgba(16,185,129,0.15); }
    .card-emoji { font-size: 40px; }
    .option-card span { font-size: 14.5px; font-weight: 600; color: #0f172a; text-align: center; }

    /* Voice Selection */
    .centered-title { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }
    .centered-sub { font-size: 14.5px; color: #64748b; margin: 0 0 36px 0; }

    .cards-grid-2 {
      display: flex; gap: 20px; justify-content: center; width: 100%; max-width: 480px; margin-bottom: 28px;
    }
    .voice-card {
      flex: 1; background: #f1f5f9; border: 2px solid transparent; border-radius: 20px;
      padding: 40px 20px; display: flex; flex-direction: column; align-items: center;
      gap: 12px; cursor: pointer; position: relative; transition: all 0.2s;
    }
    .voice-card.selected { background: #ffffff; border-color: #10b981; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
    .wave-icon { font-size: 32px; color: #94a3b8; }
    .voice-card span { font-size: 15px; font-weight: 600; color: #0f172a; }

    .toggle-row { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 500; color: #0f172a; }
    .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #cbd5e1; transition: .3s; border-radius: 24px;
    }
    .slider:before {
      position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
      background-color: white; transition: .3s; border-radius: 50%;
    }
    input:checked + .slider { background-color: #99f6e4; }
    input:checked + .slider:before { transform: translateX(20px); background-color: #0d9488; }

    /* Age Input */
    .input-wrapper { width: 100%; max-width: 360px; margin-top: 10px; }
    .age-input {
      width: 100%; padding: 14px; border: 2px solid #0f172a; border-radius: 12px;
      font-size: 15px; text-align: center; outline: none; font-weight: 600;
    }
    .age-input::placeholder { color: #cbd5e1; font-weight: 400; }

    /* Subject Cards Grid */
    .subject-cards-grid { display: flex; gap: 20px; justify-content: center; width: 100%; max-width: 520px; }
    .subject-card {
      flex: 1; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px;
      padding: 32px 20px; display: flex; flex-direction: column; align-items: center;
      gap: 16px; cursor: pointer; transition: all 0.2s;
    }
    .subject-card--math {
      background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%); border-color: #93c5fd;
    }
    .subject-card.selected { border-color: #10b981; box-shadow: 0 8px 24px rgba(16,185,129,0.15); }
    .subject-icon { font-size: 36px; color: #2563eb; }
    .cs-icon { color: #7c3aed; }
    .subject-card h3 { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0; text-align: center; }

    /* Bottom Action Bar */
    .bottom-bar {
      max-width: 900px; margin: 0 auto; width: 100%; padding: 0 32px 36px 32px;
      display: flex; justify-content: center;
    }
    .continue-btn {
      width: 100%; max-width: 340px; padding: 14px; border-radius: 24px;
      background: #475569; color: #ffffff; border: none; font-size: 15px;
      font-weight: 700; cursor: pointer; transition: all 0.2s;
    }
    .continue-btn:hover:not(:disabled) { background: #334155; transform: translateY(-1px); }
    .continue-btn:disabled { background: #f1f5f9; color: #cbd5e1; cursor: not-allowed; }
  `]
})
export class OnboardingComponent {
  @Output() finishOnboarding = new EventEmitter<void>();

  currentStep: number = 1;

  selectedMotivation: string = 'growth';
  selectedVoice: string = 'deep';
  voiceEnabled: boolean = true;
  userAge: number | null = 22;
  selectedSubject: string = 'cs';

  getSegmentWidth(segmentIndex: number): number {
    if (segmentIndex === 1) {
      return this.currentStep >= 2 ? 100 : (this.currentStep === 1 ? 50 : 0);
    } else if (segmentIndex === 2) {
      return this.currentStep >= 4 ? 100 : (this.currentStep === 3 ? 50 : 0);
    } else if (segmentIndex === 3) {
      return this.currentStep === 5 ? 100 : 0;
    }
    return 0;
  }

  canContinue(): boolean {
    if (this.currentStep === 2 && !this.selectedMotivation) return false;
    if (this.currentStep === 3 && !this.selectedVoice) return false;
    if (this.currentStep === 4 && (!this.userAge || this.userAge <= 0)) return false;
    if (this.currentStep === 5 && !this.selectedSubject) return false;
    return true;
  }

  selectMotivation(key: string): void {
    this.selectedMotivation = key;
  }

  selectVoice(key: string): void {
    this.selectedVoice = key;
  }

  selectSubject(key: string): void {
    this.selectedSubject = key;
  }

  toggleAudio(): void {
    this.voiceEnabled = !this.voiceEnabled;
  }

  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    } else {
      // Finished onboarding
      localStorage.setItem('onboarding_completed', 'true');
      this.finishOnboarding.emit();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

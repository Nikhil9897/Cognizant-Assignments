import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    OnboardingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Student Course Portal';
  showOnboarding = false;

  ngOnInit(): void {
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed) {
      this.showOnboarding = true;
    }
  }

  startOnboarding(): void {
    this.showOnboarding = true;
  }

  onFinishOnboarding(): void {
    this.showOnboarding = false;
  }
}

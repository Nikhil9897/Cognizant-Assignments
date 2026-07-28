import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoginModalComponent],
  template: `
    <!-- Topmost Sub-header (Audience selector) -->
    <div class="top-bar">
      <div class="top-bar__container">
        <a routerLink="/" class="top-link active">For Individuals</a>
        <a routerLink="/courses" class="top-link">For Businesses</a>
        <a routerLink="/courses" class="top-link">For Universities</a>
        <a (click)="triggerOnboarding()" class="top-link">AI Tutor Setup</a>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="main-header">
      <div class="main-header__container">
        <!-- Logo -->
        <div class="brand" routerLink="/">
          <span class="logo-text">coursera</span>
          <span class="brand-sub">Cognizant</span>
        </div>

        <!-- Explore & Nav Links -->
        <div class="nav-group">
          <button class="explore-btn" (click)="toggleExplore($event)">
            Explore
            <span class="chevron" [ngClass]="{'chevron--open': showExploreMenu}">▾</span>
          </button>
          <a routerLink="/courses" class="nav-item">Degrees</a>
          <a routerLink="/profile" class="nav-item">Profile</a>
        </div>

        <!-- Center Search Bar Pill -->
        <div class="search-pill">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (keyup.enter)="onSearch()"
            placeholder="What do you want to learn?"
            class="search-input" />
          <button class="search-btn" (click)="onSearch()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <!-- Right User Actions -->
        <div class="actions">
          <div *ngIf="authService.isLoggedIn" class="logged-user">
            <span class="user-avatar">MV</span>
            <span class="user-name">{{ authService.currentUser }}</span>
            <button class="logout-btn" (click)="onLogout()">Logout</button>
          </div>

          <div *ngIf="!authService.isLoggedIn" class="guest-actions">
            <button class="login-link" (click)="openLogin()">Log In</button>
            <button class="join-btn" (click)="openLogin()">Join for Free</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mega Menu Dropdown (Explore ▾) -->
    <div class="mega-menu" *ngIf="showExploreMenu">
      <div class="mega-menu__container">
        
        <!-- Column 1: Explore roles -->
        <div class="mega-col">
          <h4 class="mega-title">Explore roles</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" (click)="closeExplore()">Data Analyst</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Project Manager</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Cyber Security Analyst</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Data Scientist</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Business Intelligence Analyst</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Digital Marketing Specialist</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">UI / UX Designer</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Machine Learning Engineer</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Social Media Specialist</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Computer Support Specialist</a></li>
            <li><a routerLink="/courses" class="link-all" (click)="closeExplore()">View all</a></li>
          </ul>
        </div>

        <!-- Column 2: Explore categories -->
        <div class="mega-col">
          <h4 class="mega-title">Explore categories</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" (click)="closeExplore()">Artificial Intelligence</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Business</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Data Science</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Information Technology</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Computer Science</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Healthcare</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Physical Science and Engineering</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Personal Development</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Social Sciences</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Language Learning</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Arts and Humanities</a></li>
            <li><a routerLink="/courses" class="link-all" (click)="closeExplore()">View all</a></li>
          </ul>
        </div>

        <!-- Column 3: Earn a Professional Certificate & Earn an online degree -->
        <div class="mega-col">
          <h4 class="mega-title">Earn a Professional Certificate</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" (click)="closeExplore()">Business</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Computer Science</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Data Science</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Information Technology</a></li>
            <li><a routerLink="/courses" class="link-all" (click)="closeExplore()">View all</a></li>
          </ul>

          <h4 class="mega-title margin-top">Earn an online degree</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" (click)="closeExplore()">Bachelor's Degrees</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Master's Degrees</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">University Certificates</a></li>
            <li><a routerLink="/courses" class="link-all" (click)="closeExplore()">View all</a></li>
          </ul>
        </div>

        <!-- Column 4: Explore trending skills & Prepare for exam -->
        <div class="mega-col">
          <h4 class="mega-title">Explore trending skills</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" (click)="closeExplore()">Python</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Artificial Intelligence</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Excel</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Machine Learning</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">SQL</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Project Management</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Power BI</a></li>
            <li><a routerLink="/courses" (click)="closeExplore()">Marketing</a></li>
          </ul>

          <h4 class="mega-title margin-top">Prepare for a certification exam</h4>
          <ul class="mega-list">
            <li><a routerLink="/courses" class="link-all" (click)="closeExplore()">View all</a></li>
          </ul>
        </div>

      </div>

      <!-- Mega Menu Bottom Bar -->
      <div class="mega-bottom">
        <div class="mega-bottom__container">
          <span>Not sure where to begin?</span>
          <a routerLink="/courses" (click)="closeExplore()" class="bottom-link">Browse free courses</a>
          <span>or</span>
          <a routerLink="/courses" (click)="closeExplore()" class="bottom-link-plus">Learn more about <strong>Coursera PLUS</strong></a>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <app-login-modal *ngIf="showLoginModal" (closeModal)="closeLogin()"></app-login-modal>
  `,
  styles: [`
    /* Top Dark Bar */
    .top-bar {
      background: #1f1f1f;
      color: #ffffff;
      height: 36px;
      display: flex;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #333333;
    }
    .top-bar__container {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 0 48px;
      display: flex;
      gap: 24px;
    }
    .top-link {
      color: #cccccc;
      text-decoration: none;
      font-weight: 500;
      padding: 8px 0;
      position: relative;
    }
    .top-link:hover { color: #ffffff; }
    .top-link.active {
      color: #ffffff;
      font-weight: 700;
    }
    .top-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #ffffff;
    }

    /* Main Header */
    .main-header {
      background: #ffffff;
      border-bottom: 1px solid #d1d7dc;
      height: 72px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .main-header__container {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 0 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    /* Brand Logo */
    .brand {
      display: flex;
      align-items: baseline;
      gap: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .logo-text {
      font-size: 26px;
      font-weight: 800;
      color: #0056d2;
      letter-spacing: -1px;
      font-family: 'Source Sans Pro', sans-serif;
    }
    .brand-sub {
      font-size: 11px;
      font-weight: 700;
      color: #6e6e6e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Explore & Nav Links */
    .nav-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .explore-btn {
      background: transparent;
      border: 1px solid #0056d2;
      color: #0056d2;
      padding: 8px 14px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .explore-btn:hover { background: #f0f4fd; }
    .chevron { font-size: 10px; transition: transform 0.2s; }
    .chevron--open { transform: rotate(180deg); }

    .nav-item {
      color: #1f1f1f;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    .nav-item:hover { color: #0056d2; }

    /* Search Pill Bar */
    .search-pill {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #757575;
      border-radius: 24px;
      padding: 3px 4px 3px 18px;
      width: 420px;
      transition: border-color 0.2s;
    }
    .search-pill:focus-within {
      border-color: #0056d2;
      box-shadow: 0 0 0 2px rgba(0,86,210,0.2);
    }
    .search-input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      font-size: 14px;
      color: #1f1f1f;
    }
    .search-input::placeholder { color: #6e6e6e; }
    .search-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #0056d2;
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
    }
    .search-btn:hover { background: #00419e; }

    /* Right Actions */
    .guest-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .login-link {
      background: transparent;
      border: none;
      color: #0056d2;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      padding: 8px 12px;
    }
    .login-link:hover { text-decoration: underline; }
    .join-btn {
      background: transparent;
      border: 1px solid #0056d2;
      color: #0056d2;
      padding: 8px 18px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .join-btn:hover { background: #0056d2; color: #ffffff; }

    .logged-user {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0056d2;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-name { font-size: 14px; font-weight: 600; color: #1f1f1f; }
    .logout-btn {
      background: transparent;
      border: 1px solid #d1d7dc;
      color: #525252;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
    }
    .logout-btn:hover { border-color: #0056d2; color: #0056d2; }

    /* Mega Menu Dropdown */
    .mega-menu {
      position: absolute;
      top: 108px;
      left: 0;
      width: 100vw;
      background: #ffffff;
      border-bottom: 1px solid #d1d7dc;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      z-index: 99;
    }
    .mega-menu__container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px 48px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
    .mega-col { display: flex; flex-direction: column; }
    .mega-title {
      font-size: 14px;
      font-weight: 700;
      color: #1f1f1f;
      margin: 0 0 12px 0;
    }
    .margin-top { margin-top: 24px; }
    .mega-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mega-list a {
      color: #525252;
      text-decoration: none;
      font-size: 13.5px;
      transition: color 0.2s;
    }
    .mega-list a:hover { color: #0056d2; }
    .link-all {
      color: #0056d2 !important;
      text-decoration: underline !important;
      font-weight: 600;
    }

    .mega-bottom {
      background: #f5f7fa;
      border-top: 1px solid #e1e6ed;
      padding: 14px 48px;
    }
    .mega-bottom__container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: #525252;
    }
    .bottom-link {
      color: #0056d2;
      text-decoration: underline;
      font-weight: 600;
      cursor: pointer;
    }
    .bottom-link-plus {
      color: #0056d2;
      text-decoration: none;
      cursor: pointer;
    }
    .bottom-link-plus strong {
      background: #0056d2;
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      margin-left: 4px;
    }
  `]
})
export class HeaderComponent {
  @Output() openOnboarding = new EventEmitter<void>();

  searchQuery: string = '';
  showLoginModal: boolean = false;
  showExploreMenu: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private el: ElementRef
  ) {}

  triggerOnboarding(): void {
    this.openOnboarding.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showExploreMenu = false;
    }
  }

  toggleExplore(event: MouseEvent): void {
    event.stopPropagation();
    this.showExploreMenu = !this.showExploreMenu;
  }

  closeExplore(): void {
    this.showExploreMenu = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/courses'], { queryParams: { q: this.searchQuery } });
    }
  }

  openLogin(): void {
    this.showLoginModal = true;
  }

  closeLogin(): void {
    this.showLoginModal = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

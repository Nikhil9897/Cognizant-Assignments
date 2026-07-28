import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginModalComponent
  ],
  template: `
    <div class="coursera-home">
      
      <!-- Dual Hero Banners Row -->
      <div class="hero-row">
        <!-- Left Banner Card (Blue) -->
        <div class="hero-card hero-card--blue">
          <div class="hero-card__content">
            <h1 class="hero-card__title">Start, switch, or advance your career</h1>
            <p class="hero-card__subtitle">Grow with courses from top organizations</p>
            <button class="hero-btn hero-btn--white" (click)="openLoginModal()">
              Join for Free &rarr;
            </button>
          </div>
          <div class="hero-card__visual">
            <div class="student-circle">
              <div class="student-avatar-img">👤</div>
            </div>
          </div>
        </div>

        <!-- Right Banner Card (Light Gray) -->
        <div class="hero-card hero-card--gray">
          <div class="hero-card__content">
            <h2 class="hero-card__title hero-card__title--dark">Drive your business forward and empower your talent</h2>
            <p class="hero-card__subtitle hero-card__subtitle--dark">Train your team with industry-leading experts</p>
            <button class="hero-btn hero-btn--blue" (click)="openLoginModal()">
              Try Coursera for Business &rarr;
            </button>
          </div>
          <div class="hero-card__visual">
            <div class="partner-grid">
              <div class="partner-logo">L'ORÉAL</div>
              <div class="partner-logo">P&G</div>
              <div class="partner-logo">TATA</div>
              <div class="partner-logo">Danone</div>
              <div class="partner-logo">Emirates</div>
              <div class="partner-logo">Reliance</div>
              <div class="partner-logo">Capgemini</div>
              <div class="partner-logo">Petrobras</div>
              <div class="partner-logo">GE</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Pagination Dots -->
      <div class="dots-row">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>

      <!-- Universities & Companies Ribbon -->
      <section class="section-brands">
        <h3 class="brands-title">Learn from 350+ leading universities and companies</h3>
        <div class="brands-flex">
          <div class="brand-item"><span class="b-icon">G</span> Google</div>
          <div class="brand-item"><span class="b-icon">IBM</span> IBM</div>
          <div class="brand-item"><span class="b-icon">MS</span> Microsoft</div>
          <div class="brand-item">University of Illinois</div>
          <div class="brand-item">OpenAI</div>
          <div class="brand-item">Anthropic</div>
          <div class="brand-item">DeepLearning.AI</div>
          <div class="brand-item">Stanford University</div>
          <div class="brand-item">University of Pennsylvania</div>
        </div>
      </section>

      <!-- 3 Action Cards -->
      <section class="action-cards-grid">
        <div class="action-card" routerLink="/courses">
          <div class="action-card__info">
            <h3>Launch a new career</h3>
          </div>
          <div class="action-card__icon">🏅</div>
        </div>

        <div class="action-card" routerLink="/courses">
          <div class="action-card__info">
            <h3>Try Coursera for Business</h3>
          </div>
          <div class="action-card__icon">⛳</div>
        </div>

        <div class="action-card" routerLink="/courses">
          <div class="action-card__info">
            <h3>Earn a degree</h3>
          </div>
          <div class="action-card__icon">🎓</div>
        </div>
      </section>

      <!-- Explore Categories Chips -->
      <section class="section-chips">
        <h3 class="section-title">Explore categories</h3>
        <div class="chips-flex">
          <button *ngFor="let cat of exploreCategoryChips" class="chip-btn" (click)="filterByChip(cat.name)">
            <span class="chip-icon">{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </section>

      <!-- Coursera PLUS Google Career Collection Banner -->
      <section class="plus-banner-container">
        <div class="plus-banner">
          <div class="plus-banner__left">
            <span class="plus-logo">coursera <strong>PLUS</strong></span>
            <h2>Google Career Collection</h2>
            <p>Explore multiple career pathways with entry-level programs from Google. <a class="plus-link">Learn more</a></p>
            <button class="btn-trial" (click)="openLoginModal()">Start 7-day free trial</button>
          </div>

          <div class="plus-banner__right">
            <!-- Card 1 -->
            <div class="plus-card" routerLink="/courses/1">
              <div class="plus-card__top banner-ai">
                <span class="google-g">G</span>
                <span class="banner-title">AI ESSENTIALS</span>
              </div>
              <div class="plus-card__body">
                <span class="org-sub">Google</span>
                <h4>Google AI Essentials</h4>
                <div class="meta">Specialization • ★ 4.8</div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="plus-card" routerLink="/courses/1">
              <div class="plus-card__top banner-data">
                <span class="google-g">G</span>
                <span class="banner-title">DATA ANALYTICS</span>
              </div>
              <div class="plus-card__body">
                <span class="org-sub">Google</span>
                <h4>Google Data Analytics</h4>
                <div class="meta">Professional Certificate • ★ 4.8</div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="plus-card" routerLink="/courses/2">
              <div class="plus-card__top banner-pm">
                <span class="google-g">G</span>
                <span class="banner-title">PROJECT MANAGEMENT</span>
              </div>
              <div class="plus-card__body">
                <span class="org-sub">Google</span>
                <h4>Google Project Management</h4>
                <div class="meta">Professional Certificate • ★ 4.8</div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="plus-card" routerLink="/courses/3">
              <div class="plus-card__top banner-cyber">
                <span class="google-g">G</span>
                <span class="banner-title">CYBERSECURITY</span>
              </div>
              <div class="plus-card__body">
                <span class="org-sub">Google</span>
                <h4>Google Cybersecurity</h4>
                <div class="meta">Professional Certificate • ★ 4.8</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: New and popular -->
      <section class="catalog-section">
        <h2 class="section-title">New and popular</h2>

        <div class="columns-grid">

          <!-- Column 1: Most popular -->
          <div class="column-container">
            <div class="column-header">
              <h3>Most popular</h3>
              <span class="arrow">&rarr;</span>
            </div>

            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/1">
                <div class="item-logo logo-google">G</div>
                <div class="item-info">
                  <span class="org-name">Google</span>
                  <h4 class="item-title">Google Data Analytics</h4>
                  <div class="item-meta">
                    <span class="type-tag">Professional Certificate</span>
                    <span class="dot-separator">•</span>
                    <span class="star-rating">★ 4.8</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/2">
                <div class="item-logo logo-google">G</div>
                <div class="item-info">
                  <span class="org-name">Google</span>
                  <h4 class="item-title">Foundations: Data, Data, Everywhere</h4>
                  <div class="item-meta">
                    <span class="type-tag">Course</span>
                    <span class="dot-separator">•</span>
                    <span class="star-rating">★ 4.8</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/4">
                <div class="item-logo logo-umich">M</div>
                <div class="item-info">
                  <span class="org-name">University of Michigan</span>
                  <h4 class="item-title">Python for Everybody</h4>
                  <div class="item-meta">
                    <span class="type-tag">Specialization</span>
                    <span class="dot-separator">•</span>
                    <span class="star-rating">★ 4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Hot new releases -->
          <div class="column-container">
            <div class="column-header">
              <h3>Hot new releases</h3>
              <span class="arrow">&rarr;</span>
            </div>

            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/1">
                <div class="item-logo logo-msft">MS</div>
                <div class="item-info">
                  <span class="org-name">Microsoft</span>
                  <h4 class="item-title">Microsoft Junior QA/Software Tester</h4>
                  <div class="item-meta">
                    <span class="type-tag">Specialization</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/2">
                <div class="item-logo logo-ibm">IBM</div>
                <div class="item-info">
                  <span class="org-name">IBM</span>
                  <h4 class="item-title">IBM Sales Representative</h4>
                  <div class="item-meta">
                    <span class="type-tag">Specialization</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/3">
                <div class="item-logo logo-hrci">HR</div>
                <div class="item-info">
                  <span class="org-name">HRCI</span>
                  <h4 class="item-title">HRCI Professional in Human Resources</h4>
                  <div class="item-meta">
                    <span class="type-tag">Professional Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Trending AI courses -->
          <div class="column-container">
            <div class="column-header">
              <h3>Trending AI courses</h3>
              <span class="arrow">&rarr;</span>
            </div>

            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/1">
                <div class="item-logo logo-google">G</div>
                <div class="item-info">
                  <span class="org-name">Google</span>
                  <h4 class="item-title">Google AI</h4>
                  <div class="item-meta">
                    <span class="type-tag">Professional Certificate</span>
                    <span class="dot-separator">•</span>
                    <span class="star-rating">★ 4.8</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/4">
                <div class="item-logo logo-vandy">V</div>
                <div class="item-info">
                  <span class="org-name">Vanderbilt University</span>
                  <h4 class="item-title">Agentic AI and AI Agents for Leaders</h4>
                  <div class="item-meta">
                    <span class="type-tag">Specialization</span>
                    <span class="dot-separator">•</span>
                    <span class="star-rating">★ 4.8</span>
                  </div>
                </div>
              </div>

              <div class="coursera-item-card" routerLink="/courses/3">
                <div class="item-logo logo-oxford">O</div>
                <div class="item-info">
                  <span class="org-name">Saïd Business School, Oxford</span>
                  <h4 class="item-title">AI Foundations for Business Professionals</h4>
                  <div class="item-meta">
                    <span class="type-tag">Specialization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Section: Trending searches -->
      <section class="catalog-section">
        <h2 class="section-title">Trending searches</h2>

        <div class="columns-grid">
          <!-- Python -->
          <div class="column-container">
            <div class="column-header">
              <h3>Python</h3>
              <span class="arrow">&rarr;</span>
            </div>
            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/4">
                <div class="item-logo logo-umich">M</div>
                <div class="item-info">
                  <span class="org-name">University of Michigan</span>
                  <h4 class="item-title">Python for Everybody</h4>
                  <div class="item-meta"><span class="type-tag">Specialization</span> • ★ 4.8</div>
                </div>
              </div>
              <div class="coursera-item-card" routerLink="/courses/4">
                <div class="item-logo logo-umich">M</div>
                <div class="item-info">
                  <span class="org-name">University of Michigan</span>
                  <h4 class="item-title">Python 3 Programming</h4>
                  <div class="item-meta"><span class="type-tag">Specialization</span> • ★ 4.8</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Analytics -->
          <div class="column-container">
            <div class="column-header">
              <h3>Data Analytics</h3>
              <span class="arrow">&rarr;</span>
            </div>
            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/1">
                <div class="item-logo logo-google">G</div>
                <div class="item-info">
                  <span class="org-name">Google</span>
                  <h4 class="item-title">Google Advanced Data Analytics</h4>
                  <div class="item-meta"><span class="type-tag">Professional Certificate</span> • ★ 4.8</div>
                </div>
              </div>
              <div class="coursera-item-card" routerLink="/courses/2">
                <div class="item-logo logo-ibm">IBM</div>
                <div class="item-info">
                  <span class="org-name">IBM</span>
                  <h4 class="item-title">IBM Data Analyst</h4>
                  <div class="item-meta"><span class="type-tag">Professional Certificate</span> • ★ 4.6</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project Management -->
          <div class="column-container">
            <div class="column-header">
              <h3>Project Management</h3>
              <span class="arrow">&rarr;</span>
            </div>
            <div class="cards-list">
              <div class="coursera-item-card" routerLink="/courses/2">
                <div class="item-logo logo-google">G</div>
                <div class="item-info">
                  <span class="org-name">Google</span>
                  <h4 class="item-title">Foundations of Project Management</h4>
                  <div class="item-meta"><span class="type-tag">Course</span> • ★ 4.9</div>
                </div>
              </div>
              <div class="coursera-item-card" routerLink="/courses/3">
                <div class="item-logo logo-ibm">IBM</div>
                <div class="item-info">
                  <span class="org-name">IBM</span>
                  <h4 class="item-title">IBM Project Manager</h4>
                  <div class="item-meta"><span class="type-tag">Professional Certificate</span> • ★ 4.8</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Login Modal -->
      <app-login-modal *ngIf="showLogin" (closeModal)="closeLoginModal()"></app-login-modal>
    </div>
  `,
  styles: [`
    .coursera-home {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    /* Dual Hero Banners Row */
    .hero-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 992px) {
      .hero-row { grid-template-columns: 1fr; }
    }

    .hero-card {
      border-radius: 24px;
      padding: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 260px;
      position: relative;
      overflow: hidden;
    }
    .hero-card--blue {
      background: linear-gradient(135deg, #0056d2 0%, #003b93 100%);
      color: #ffffff;
    }
    .hero-card--gray {
      background: #f5f7fa;
      border: 1px solid #e1e6ed;
      color: #1f1f1f;
    }

    .hero-card__content {
      max-width: 320px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2;
    }
    .hero-card__title {
      font-size: 28px;
      font-weight: 800;
      line-height: 1.25;
      margin: 0;
      color: #ffffff;
      font-family: 'Source Sans Pro', sans-serif;
    }
    .hero-card__title--dark { color: #1f1f1f; font-size: 24px; }

    .hero-card__subtitle {
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
      color: #e6f0ff;
    }
    .hero-card__subtitle--dark { color: #525252; }

    .hero-btn {
      padding: 10px 22px;
      border-radius: 24px;
      font-weight: 700;
      font-size: 14px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: fit-content;
      margin-top: 8px;
      transition: transform 0.2s;
    }
    .hero-btn:hover { transform: translateY(-1px); }
    .hero-btn--white { background: #ffffff; color: #0056d2; }
    .hero-btn--blue { background: #0056d2; color: #ffffff; }

    .hero-card__visual { display: flex; align-items: center; justify-content: center; }

    .student-circle {
      width: 140px; height: 140px; border-radius: 50%;
      background: radial-gradient(circle, #f9a8d4 0%, #3b82f6 100%);
      display: flex; align-items: center; justify-content: center;
      border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    .student-avatar-img { font-size: 64px; line-height: 1; }

    .partner-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
      background: #ffffff; padding: 14px; border-radius: 12px;
      border: 1px solid #e1e6ed; box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .partner-logo {
      font-size: 11px; font-weight: 800; color: #334155; background: #f8fafc;
      padding: 8px 12px; border-radius: 4px; text-align: center; border: 1px solid #f1f5f9; letter-spacing: 0.5px;
    }

    .dots-row { display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #c1c1c1; }
    .dot.active { background: #334155; width: 24px; border-radius: 10px; }

    /* Brands Ribbon */
    .section-brands { display: flex; flex-direction: column; gap: 14px; }
    .brands-title { font-size: 16px; font-weight: 700; color: #1f1f1f; margin: 0; }
    .brands-flex { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .brand-item {
      display: flex; align-items: center; gap: 6px; background: #f5f7fa;
      border: 1px solid #e1e6ed; padding: 8px 16px; border-radius: 20px;
      font-size: 13px; font-weight: 600; color: #334155;
    }
    .b-icon { font-weight: 800; color: #0056d2; }

    /* Action Cards Grid */
    .action-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media (max-width: 900px) { .action-cards-grid { grid-template-columns: 1fr; } }
    .action-card {
      background: #f5f7fa; border-radius: 16px; padding: 24px 28px;
      display: flex; justify-content: space-between; align-items: center;
      border: 1px solid #e1e6ed; cursor: pointer; transition: all 0.2s;
    }
    .action-card:hover { background: #ffffff; border-color: #0056d2; box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
    .action-card h3 { font-size: 18px; font-weight: 700; color: #1f1f1f; margin: 0; }
    .action-card__icon { font-size: 28px; }

    /* Chips */
    .section-chips { display: flex; flex-direction: column; gap: 14px; }
    .chips-flex { display: flex; gap: 10px; flex-wrap: wrap; }
    .chip-btn {
      display: flex; align-items: center; gap: 8px; background: #f5f7fa;
      border: 1px solid #e1e6ed; border-radius: 20px; padding: 8px 16px;
      font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.2s;
    }
    .chip-btn:hover { background: #0056d2; color: #ffffff; border-color: #0056d2; }

    /* Coursera PLUS Banner */
    .plus-banner-container { margin: 12px 0; }
    .plus-banner {
      background: #0056d2; border-radius: 20px; padding: 36px; color: #ffffff;
      display: grid; grid-template-columns: 300px 1fr; gap: 32px; align-items: center;
    }
    @media (max-width: 1100px) { .plus-banner { grid-template-columns: 1fr; } }
    .plus-logo { font-size: 16px; font-weight: 800; }
    .plus-logo strong { background: #ffffff; color: #0056d2; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 4px; }
    .plus-banner h2 { font-size: 24px; font-weight: 800; color: #ffffff; margin: 8px 0; }
    .plus-banner p { font-size: 13.5px; color: #d1e3ff; line-height: 1.5; margin-bottom: 20px; }
    .plus-link { color: #ffffff; text-decoration: underline; cursor: pointer; }
    .btn-trial { background: #ffffff; color: #0056d2; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; font-size: 13.5px; cursor: pointer; }

    .plus-banner__right { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    @media (max-width: 900px) { .plus-banner__right { grid-template-columns: repeat(2, 1fr); } }
    .plus-card { background: #ffffff; border-radius: 12px; overflow: hidden; color: #1f1f1f; cursor: pointer; transition: transform 0.2s; }
    .plus-card:hover { transform: translateY(-3px); }
    .plus-card__top { padding: 16px 12px; color: #ffffff; display: flex; flex-direction: column; gap: 4px; }
    .banner-ai { background: #0284c7; }
    .banner-data { background: #0284c7; }
    .banner-pm { background: #0284c7; }
    .banner-cyber { background: #0284c7; }
    .google-g { font-weight: 800; font-size: 16px; }
    .banner-title { font-size: 10px; font-weight: 800; letter-spacing: 0.5px; }
    .plus-card__body { padding: 12px; }
    .org-sub { font-size: 11px; color: #6e6e6e; }
    .plus-card__body h4 { font-size: 13px; font-weight: 700; margin: 4px 0 8px 0; color: #1f1f1f; }
    .meta { font-size: 11px; color: #525252; }

    /* Catalog Columns */
    .catalog-section { display: flex; flex-direction: column; gap: 20px; }
    .section-title { font-size: 22px; font-weight: 800; color: #1f1f1f; margin: 0; }
    .columns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (max-width: 992px) { .columns-grid { grid-template-columns: 1fr; } }
    .column-container { background: #edf2f9; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
    .column-header { display: flex; justify-content: space-between; align-items: center; }
    .column-header h3 { font-size: 17px; font-weight: 700; color: #1f1f1f; margin: 0; }
    .arrow { font-size: 16px; color: #1f1f1f; font-weight: 700; }
    .cards-list { display: flex; flex-direction: column; gap: 12px; }
    .coursera-item-card { background: #ffffff; border-radius: 12px; padding: 16px; display: flex; gap: 14px; align-items: flex-start; border: 1px solid #e1e6ed; cursor: pointer; transition: all 0.2s ease; }
    .coursera-item-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #0056d2; }
    .item-logo { width: 44px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0; }
    .logo-google { background: #ea4335; color: #ffffff; }
    .logo-umich { background: #00274c; color: #ffcb05; }
    .logo-msft { background: #0078d4; color: #ffffff; }
    .logo-ibm { background: #054ada; color: #ffffff; }
    .logo-hrci { background: #7c3aed; color: #ffffff; }
    .logo-vandy { background: #1c1917; color: #d97706; }
    .logo-oxford { background: #002147; color: #ffffff; }
    .item-info { display: flex; flex-direction: column; gap: 4px; }
    .org-name { font-size: 12px; color: #6e6e6e; font-weight: 500; }
    .item-title { font-size: 14px; font-weight: 700; color: #1f1f1f; margin: 0; line-height: 1.35; }
    .item-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #525252; margin-top: 2px; }
    .type-tag { font-weight: 500; color: #525252; }
    .dot-separator { color: #94a3b8; }
    .star-rating { font-weight: 700; color: #1f1f1f; }
  `]
})
export class HomeComponent implements OnInit {
  featuredCourses: Course[] = [];
  showLogin = false;

  exploreCategoryChips = [
    { name: 'Business', icon: '💼' },
    { name: 'Artificial Intelligence', icon: '✦' },
    { name: 'Data Science', icon: '📈' },
    { name: 'Computer Science', icon: '💻' },
    { name: 'Information Technology', icon: '🖥️' },
    { name: 'Personal Development', icon: '⚙️' },
    { name: 'Healthcare', icon: '🩺' },
    { name: 'Language Learning', icon: '🌐' },
    { name: 'Social Sciences', icon: '👥' },
    { name: 'Arts and Humanities', icon: '🎨' },
    { name: 'Physical Science and Engineering', icon: '🔬' },
    { name: 'Math and Logic', icon: '📐' }
  ];

  constructor(
    private courseService: CourseService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.featuredCourses = courses;
    });
  }

  filterByChip(name: string): void {
    this.openLoginModal();
  }

  openLoginModal(): void {
    this.showLogin = true;
  }

  closeLoginModal(): void {
    this.showLogin = false;
  }
}

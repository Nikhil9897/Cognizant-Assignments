import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar__section">
        <h3 class="sidebar__title">Main Menu</h3>
        <ul class="sidebar__list">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home Overview</a></li>
          <li><a routerLink="/dashboard" routerLinkActive="active">Analytics Dashboard</a></li>
          <li><a routerLink="/courses" routerLinkActive="active">Course Catalog</a></li>
        </ul>
      </div>

      <div class="sidebar__section">
        <h3 class="sidebar__title">Student Portal</h3>
        <ul class="sidebar__list">
          <li><a routerLink="/profile" routerLinkActive="active">Student Profile</a></li>
          <li><a routerLink="/enroll" routerLinkActive="active">Template Enrollment</a></li>
          <li><a routerLink="/enroll/reactive" routerLinkActive="active">Reactive Enrollment</a></li>
        </ul>
      </div>

      <div class="sidebar__card">
        <div class="card-icon">DN 5.0</div>
        <h4>Java FSE & Angular</h4>
        <p>Production enterprise solution developed for Digital Nurture 5.0.</p>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      padding: 28px 16px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      min-height: calc(100vh - 72px);
    }
    .sidebar__title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 10px;
      padding-left: 12px;
    }
    .sidebar__list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .sidebar__list a {
      display: block;
      padding: 9px 14px;
      border-radius: 6px;
      color: #475569;
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .sidebar__list a:hover {
      color: #059669;
      background: #f1f5f9;
    }
    .sidebar__list a.active {
      color: #059669;
      background: #ecfdf5;
      font-weight: 600;
      border-left: 3px solid #059669;
    }
    .sidebar__card {
      margin-top: auto;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }
    .card-icon { font-size: 11px; font-weight: 700; color: #059669; letter-spacing: 0.5px; }
    .sidebar__card h4 { color: #0f172a; margin: 6px 0 4px 0; font-size: 13.5px; }
    .sidebar__card p { color: #64748b; font-size: 12px; margin: 0; line-height: 1.4; }
  `]
})
export class SidebarComponent {}

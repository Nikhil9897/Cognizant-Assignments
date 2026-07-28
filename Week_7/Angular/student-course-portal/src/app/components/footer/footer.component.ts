import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="coursera-footer">
      <div class="footer-container">
        <div class="footer-col">
          <h4>Coursera for Cognizant</h4>
          <a>About Us</a>
          <a>Leadership</a>
          <a>Careers</a>
          <a>Catalog</a>
        </div>
        <div class="footer-col">
          <h4>Community</h4>
          <a>Learners</a>
          <a>Partners</a>
          <a>Beta Testers</a>
          <a>Translators</a>
        </div>
        <div class="footer-col">
          <h4>More</h4>
          <a>Press</a>
          <a>Investors</a>
          <a>Terms</a>
          <a>Privacy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Coursera Inc. | Cognizant Digital Nurture 5.0 — Milind Verma</p>
      </div>
    </footer>
  `,
  styles: [`
    .coursera-footer {
      background: #f5f7fa;
      border-top: 1px solid #d1d7dc;
      padding: 40px 48px 24px 48px;
      margin-top: 48px;
    }
    .footer-container {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }
    .footer-col h4 {
      font-size: 14px;
      font-weight: 700;
      color: #1f1f1f;
      margin: 0 0 12px 0;
    }
    .footer-col a {
      display: block;
      color: #525252;
      font-size: 13px;
      margin-bottom: 8px;
      text-decoration: none;
      cursor: pointer;
    }
    .footer-col a:hover { color: #0056d2; }
    .footer-bottom {
      max-width: 1400px;
      margin: 32px auto 0 auto;
      padding-top: 20px;
      border-top: 1px solid #e1e6ed;
      color: #6e6e6e;
      font-size: 13px;
    }
  `]
})
export class FooterComponent {}

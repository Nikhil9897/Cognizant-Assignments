import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { CardComponent } from '../../../shared/card/card.component';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, HighlightDirective],
  template: `
    <div class="detail-page" *ngIf="course">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <a routerLink="/courses" class="back-link">&larr; Back to Catalog</a>
        <span class="query-info" *ngIf="referrer">
          (Referred from: <strong>{{ referrer }}</strong>, View mode: <strong>{{ viewMode }}</strong>)
        </span>
      </div>

      <!-- Main Detail Banner -->
      <div class="detail-banner">
        <div class="banner-content">
          <div class="tags">
            <span class="tag tag--category">{{ course.category }}</span>
            <span class="tag tag--rating">Rating: {{ course.rating }} / 5.0</span>
          </div>

          <h1 class="course-title">{{ course.title }}</h1>
          <p class="course-instructor">Instructor: <strong>{{ course.instructor }}</strong></p>
          <p class="course-description">{{ course.description }}</p>

          <div class="meta-pills">
            <div class="pill">
              <span class="pill-label">Duration</span>
              <span class="pill-value">{{ course.duration }}</span>
            </div>
            <div class="pill">
              <span class="pill-label">Enrolled Students</span>
              <span class="pill-value">{{ course.enrolled }}</span>
            </div>
            <div class="pill">
              <span class="pill-label">Tuition Fee</span>
              <span class="pill-value price">\${{ course.price }}</span>
            </div>
          </div>

          <div class="action-bar">
            <button class="btn-enroll" (click)="enrollNow()">Enroll in this Course</button>
            <button class="btn-secondary" (click)="shareCourse()">Share Course</button>
          </div>
        </div>
      </div>

      <!-- Syllabus & Overview Grid -->
      <div class="content-grid">
        <app-card>
          <div class="card-section">
            <h3>Course Syllabus & Modules</h3>
            <ul class="syllabus-list">
              <li>Module 1: Architecture & Core Foundations</li>
              <li>Module 2: State Management & RxJS Data Pipelines</li>
              <li>Module 3: Forms, Validations & Custom Controls</li>
              <li>Module 4: Security, Interceptors & Enterprise Patterns</li>
              <li>Module 5: Capstone Project & Unit Testing</li>
            </ul>
          </div>
        </app-card>

        <app-card>
          <div class="card-section">
            <h3>Prerequisites & Requirements</h3>
            <p class="prereq-text">
              Basic knowledge of JavaScript / TypeScript and RESTful web service architecture.
            </p>
            <div class="instructor-box" appHighlight="#ecfdf5">
              <h4>About the Instructor</h4>
              <p>{{ course.instructor }} is a Principal Engineer with 10+ years of enterprise full-stack development experience.</p>
            </div>
          </div>
        </app-card>
      </div>
    </div>

    <!-- Loading Fallback -->
    <div class="not-found-box" *ngIf="!course && !loading">
      <h2>Course Not Found</h2>
      <p>The requested course ID does not exist in our catalog.</p>
      <a routerLink="/courses" class="back-link">Return to Course List</a>
    </div>
  `,
  styles: [`
    .detail-page { display: flex; flex-direction: column; gap: 20px; }
    .breadcrumb { display: flex; align-items: center; gap: 16px; font-size: 13px; color: #64748b; }
    .back-link { color: #059669; text-decoration: none; font-weight: 600; }
    .back-link:hover { text-decoration: underline; }
    .query-info { font-size: 12px; color: #64748b; }

    .detail-banner {
      background: #ffffff;
      border: 1px solid #e2e8f0; border-radius: 12px; padding: 36px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .banner-content { display: flex; flex-direction: column; gap: 14px; max-width: 800px; }
    .tags { display: flex; gap: 8px; }
    .tag { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 4px; }
    .tag--category { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .tag--rating { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }

    .course-title { font-size: 28px; color: #0f172a; margin: 0; }
    .course-instructor { color: #64748b; margin: 0; font-size: 14px; }
    .course-description { color: #334155; line-height: 1.6; font-size: 14.5px; margin: 0; }

    .meta-pills { display: flex; gap: 16px; margin-top: 8px; }
    .pill { display: flex; flex-direction: column; gap: 2px; background: #f8fafc; padding: 10px 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .pill-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 500; }
    .pill-value { font-size: 14.5px; font-weight: 600; color: #0f172a; }
    .pill-value.price { color: #059669; font-size: 16px; }

    .action-bar { display: flex; gap: 12px; margin-top: 12px; }
    .btn-enroll {
      background: #059669; color: #fff; border: none; padding: 10px 24px;
      border-radius: 6px; font-weight: 600; font-size: 13.5px; cursor: pointer; transition: background 0.2s;
    }
    .btn-enroll:hover { background: #047857; }
    .btn-secondary {
      background: transparent; border: 1px solid #cbd5e1; color: #475569;
      padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 13.5px; cursor: pointer;
    }

    .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card-section h3 { color: #0f172a; font-size: 16px; margin-top: 0; }
    .syllabus-list { color: #475569; padding-left: 18px; line-height: 1.8; font-size: 13.5px; }
    .prereq-text { color: #475569; font-size: 13.5px; line-height: 1.5; }
    .instructor-box { margin-top: 14px; padding: 14px; border-radius: 8px; border: 1px solid #a7f3d0; }
    .instructor-box h4 { color: #0f172a; margin: 0 0 4px 0; font-size: 13.5px; }
    .instructor-box p { color: #475569; font-size: 12.5px; margin: 0; }

    .not-found-box { text-align: center; padding: 60px; color: #0f172a; }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  loading: boolean = true;
  referrer: string = '';
  viewMode: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.fetchCourse(id);
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      this.referrer = queryParams['ref'] || '';
      this.viewMode = queryParams['view'] || 'default';
    });
  }

  fetchCourse(id: number): void {
    this.loading = true;
    this.courseService.getCourse(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: () => {
        this.course = null;
        this.loading = false;
      }
    });
  }

  enrollNow(): void {
    if (this.course) {
      this.router.navigate(['/enroll/reactive'], {
        queryParams: { courseId: this.course.id, courseTitle: this.course.title }
      });
    }
  }

  shareCourse(): void {
    alert(`Course link copied to clipboard for course ID: ${this.course?.id}`);
  }
}

import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';
import { Student } from '../../models/student.model';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  template: `
    <div class="dashboard">
      <div class="dashboard__header">
        <div>
          <h1 class="page-title">Analytics Dashboard</h1>
          <p class="page-subtitle">Angular Lifecycle Hooks (ngOnInit, ngAfterViewInit, ngOnDestroy) & RxJS Streams</p>
        </div>
        <div class="live-indicator" #statusIndicator>
          <span class="status-dot"></span>
          <span>Live Data Stream Active</span>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="metrics-grid">
        <app-card>
          <div class="metric">
            <span class="metric__label">Total Courses</span>
            <span class="metric__value">{{ courses.length }}</span>
          </div>
        </app-card>

        <app-card>
          <div class="metric">
            <span class="metric__label">Active Students</span>
            <span class="metric__value">{{ students.length }}</span>
          </div>
        </app-card>

        <app-card>
          <div class="metric">
            <span class="metric__label">Total Enrollments</span>
            <span class="metric__value">{{ enrollments.length }}</span>
          </div>
        </app-card>

        <app-card>
          <div class="metric">
            <span class="metric__label">Avg Rating</span>
            <span class="metric__value text-green">{{ averageRating.toFixed(1) }}</span>
          </div>
        </app-card>
      </div>

      <!-- Main Content Grid -->
      <div class="dashboard__body">
        <!-- Recent Enrollments Table -->
        <div class="dashboard__panel">
          <div class="panel-header">
            <h3>Recent Student Enrollments</h3>
            <a routerLink="/enroll/reactive" class="panel-link">+ New Enrollment</a>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Enrollment ID</th>
                  <th>Student ID</th>
                  <th>Course ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of enrollments">
                  <td>#{{ item.id }}</td>
                  <td>Student #{{ item.studentId }}</td>
                  <td>Course #{{ item.courseId }}</td>
                  <td>{{ item.enrollmentDate }}</td>
                  <td>
                    <span class="status-badge" [ngClass]="'status-badge--' + item.status">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
                <tr *ngIf="enrollments.length === 0">
                  <td colspan="5" class="empty-cell">No enrollments recorded yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top Courses List -->
        <div class="dashboard__panel">
          <div class="panel-header">
            <h3>Top Courses</h3>
            <a routerLink="/courses" class="panel-link">View All</a>
          </div>
          <div class="top-courses-list">
            <div *ngFor="let course of topCourses" class="top-course-item">
              <div class="top-course-info">
                <span class="top-course-title">{{ course.title }}</span>
                <span class="top-course-instructor">Instructor: {{ course.instructor }}</span>
              </div>
              <div class="top-course-meta">
                <span class="rating-badge">Rating: {{ course.rating }}</span>
                <span class="enrolled-count">{{ course.enrolled }} Enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .dashboard__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-title {
      font-size: 24px;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .page-subtitle {
      color: #64748b;
      font-size: 13px;
      margin: 0;
    }
    .live-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      color: #047857;
      font-weight: 600;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .metric__label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }
    .metric__value {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
    }
    .text-green { color: #059669; }

    .dashboard__body {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 20px;
    }
    @media (max-width: 900px) {
      .dashboard__body { grid-template-columns: 1fr; }
    }

    .dashboard__panel {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .panel-header h3 {
      font-size: 16px;
      color: #0f172a;
      margin: 0;
    }
    .panel-link {
      color: #059669;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
    }

    .table-wrapper { overflow-x: auto; }
    .data-table {
      width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;
    }
    .data-table th {
      color: #64748b; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; background: #f8fafc;
    }
    .data-table td {
      color: #334155; padding: 12px; border-bottom: 1px solid #f1f5f9;
    }
    .empty-cell { text-align: center; color: #94a3b8; padding: 20px; }
    .status-badge {
      padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: capitalize;
    }
    .status-badge--active { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .status-badge--completed { background: #f0fdf4; color: #059669; }
    .status-badge--dropped { background: #fef2f2; color: #dc2626; }

    .top-courses-list { display: flex; flex-direction: column; gap: 10px; }
    .top-course-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;
    }
    .top-course-info { display: flex; flex-direction: column; gap: 2px; }
    .top-course-title { font-weight: 600; color: #0f172a; font-size: 13.5px; }
    .top-course-instructor { font-size: 11.5px; color: #64748b; }
    .top-course-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
    .rating-badge { font-size: 12px; color: #d97706; font-weight: 600; }
    .enrolled-count { font-size: 11px; color: #64748b; }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('statusIndicator') statusIndicator!: ElementRef;

  courses: Course[] = [];
  students: Student[] = [];
  enrollments: Enrollment[] = [];
  topCourses: Course[] = [];
  averageRating: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.courseService.getCourses().subscribe(data => {
        this.courses = data;
        this.topCourses = [...data].sort((a, b) => b.enrolled - a.enrolled).slice(0, 4);
        if (data.length > 0) {
          const totalRating = data.reduce((acc, c) => acc + c.rating, 0);
          this.averageRating = totalRating / data.length;
        }
      })
    );

    this.subscriptions.add(
      this.studentService.getStudents().subscribe(data => {
        this.students = data;
      })
    );

    this.subscriptions.add(
      this.enrollmentService.getEnrollments().subscribe(data => {
        this.enrollments = data;
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.statusIndicator) {
      this.statusIndicator.nativeElement.style.borderColor = '#10b981';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

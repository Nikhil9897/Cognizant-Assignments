import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Course } from '../../../models/course.model';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  template: `
    <div class="form-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Course Registration (Template-Driven Form)</h1>
          <p class="page-subtitle">Demonstrates ngModel & built-in validation directives (#form="ngForm", #name="ngModel")</p>
        </div>
      </div>

      <app-card>
        <form (ngSubmit)="onSubmit(enrollForm)" #enrollForm="ngForm" class="form-container">
          <div class="form-grid">
            <!-- Student Name -->
            <div class="form-group">
              <label for="studentName">Student Full Name *</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                [(ngModel)]="formData.studentName"
                #nameModel="ngModel"
                required
                minlength="3"
                class="form-control"
                [ngClass]="{'is-invalid': nameModel.invalid && nameModel.touched}" />

              <div class="error-msg" *ngIf="nameModel.invalid && nameModel.touched">
                <span *ngIf="nameModel.errors?.['required']">Full Name is required.</span>
                <span *ngIf="nameModel.errors?.['minlength']">Minimum 3 characters required.</span>
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="formData.email"
                #emailModel="ngModel"
                required
                email
                class="form-control"
                [ngClass]="{'is-invalid': emailModel.invalid && emailModel.touched}" />

              <div class="error-msg" *ngIf="emailModel.invalid && emailModel.touched">
                <span *ngIf="emailModel.errors?.['required']">Email is required.</span>
                <span *ngIf="emailModel.errors?.['email']">Please enter a valid email.</span>
              </div>
            </div>

            <!-- Target Course Selection -->
            <div class="form-group">
              <label for="courseId">Select Course *</label>
              <select
                id="courseId"
                name="courseId"
                [(ngModel)]="formData.courseId"
                #courseModel="ngModel"
                required
                class="form-control"
                [ngClass]="{'is-invalid': courseModel.invalid && courseModel.touched}">
                <option value="">-- Choose a Course --</option>
                <option *ngFor="let c of availableCourses" [value]="c.id">
                  {{ c.title }} ({{ c.category }}) - \${{ c.price }}
                </option>
              </select>

              <div class="error-msg" *ngIf="courseModel.invalid && courseModel.touched">
                Course selection is required.
              </div>
            </div>

            <!-- Preferred Schedule -->
            <div class="form-group">
              <label for="schedule">Preferred Schedule</label>
              <select
                id="schedule"
                name="schedule"
                [(ngModel)]="formData.schedule"
                class="form-control">
                <option value="Weekday Morning">Weekday Morning (9 AM - 12 PM)</option>
                <option value="Weekday Evening">Weekday Evening (6 PM - 9 PM)</option>
                <option value="Weekend Special">Weekend Special (Sat & Sun)</option>
              </select>
            </div>
          </div>

          <!-- Notes -->
          <div class="form-group margin-top">
            <label for="notes">Additional Learning Notes / Goals</label>
            <textarea
              id="notes"
              name="notes"
              [(ngModel)]="formData.notes"
              rows="3"
              class="form-control"
              placeholder="Mention any specific goals or prior experience..."></textarea>
          </div>

          <!-- Form State Debugger -->
          <div class="debug-panel">
            <span>Form Valid: <strong>{{ enrollForm.valid }}</strong></span>
            <span>Form Touched: <strong>{{ enrollForm.touched }}</strong></span>
            <span>Form Dirty: <strong>{{ enrollForm.dirty }}</strong></span>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-reset" (click)="enrollForm.resetForm()">Reset Form</button>
            <button type="submit" [disabled]="!enrollForm.valid" class="btn-submit">
              Submit Enrollment
            </button>
          </div>
        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .form-page { display: flex; flex-direction: column; gap: 24px; }
    .page-title { font-size: 24px; color: #0f172a; margin: 0 0 4px 0; }
    .page-subtitle { color: #64748b; font-size: 13px; margin: 0; }

    .form-container { display: flex; flex-direction: column; gap: 16px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }

    .form-group { display: flex; flex-direction: column; gap: 5px; }
    .form-group label { color: #475569; font-size: 12.5px; font-weight: 500; }
    .form-control {
      background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 9px 12px;
      border-radius: 6px; font-size: 13.5px; outline: none; transition: border-color 0.2s;
    }
    .form-control:focus { border-color: #059669; }
    .form-control.is-invalid { border-color: #dc2626; }

    .error-msg { color: #dc2626; font-size: 11.5px; }
    .margin-top { margin-top: 8px; }

    .debug-panel {
      display: flex; gap: 20px; background: #f8fafc; padding: 10px 14px; border-radius: 6px;
      border: 1px solid #e2e8f0; font-size: 12px; color: #64748b;
    }
    .debug-panel strong { color: #059669; }

    .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
    .btn-reset { background: transparent; border: 1px solid #cbd5e1; color: #64748b; padding: 8px 18px; border-radius: 6px; cursor: pointer; }
    .btn-submit { background: #059669; border: none; color: #fff; padding: 8px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class TemplateFormComponent implements OnInit {
  availableCourses: Course[] = [];

  formData = {
    studentName: 'Milind Verma',
    email: 'milind@cognizant.com',
    courseId: '',
    schedule: 'Weekday Evening',
    notes: ''
  };

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(c => this.availableCourses = c);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const newEnrollment = {
        studentId: 1,
        courseId: Number(this.formData.courseId),
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active' as const,
        notes: this.formData.notes
      };

      this.enrollmentService.addEnrollment(newEnrollment).subscribe(() => {
        alert('Template-driven enrollment submitted successfully!');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}

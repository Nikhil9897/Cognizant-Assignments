import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Course } from '../../../models/course.model';
import { CardComponent } from '../../../shared/card/card.component';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';

// --- Custom Synchronous Validator ---
export function cognizantEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const validPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validPattern.test(value) ? null : { invalidEmailFormat: true };
}

// --- Custom Async Validator ---
export function asyncCourseCheckValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  if (!control.value) return of(null);
  return of(control.value).pipe(
    delay(400),
    map(val => {
      return Number(val) === 999 ? { courseFull: true } : null;
    })
  );
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  template: `
    <div class="reactive-form-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Reactive Registration Engine</h1>
          <p class="page-subtitle">FormGroup, FormArray, Custom Sync/Async Validators & CanDeactivate Guard</p>
        </div>
      </div>

      <app-card>
        <form [formGroup]="enrollmentForm" (ngSubmit)="onSubmit()" class="form-container">
          
          <!-- Section 1: Basic Info -->
          <div class="section-title">1. Student Contact Information</div>
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" formControlName="fullName" class="form-control" [ngClass]="{'is-invalid': isInvalid('fullName')}" />
              <div class="error-msg" *ngIf="isInvalid('fullName')">
                <span *ngIf="hasError('fullName', 'required')">Full Name is required.</span>
                <span *ngIf="hasError('fullName', 'minlength')">Minimum 3 characters required.</span>
              </div>
            </div>

            <div class="form-group">
              <label>Email Address (With Custom Validator) *</label>
              <input type="email" formControlName="email" class="form-control" [ngClass]="{'is-invalid': isInvalid('email')}" />
              <div class="error-msg" *ngIf="isInvalid('email')">
                <span *ngIf="hasError('email', 'required')">Email is required.</span>
                <span *ngIf="hasError('email', 'invalidEmailFormat')">Invalid email format.</span>
              </div>
            </div>

            <div class="form-group">
              <label>Phone Number *</label>
              <input type="text" formControlName="phone" class="form-control" [ngClass]="{'is-invalid': isInvalid('phone')}" />
              <div class="error-msg" *ngIf="isInvalid('phone')">
                Phone number (10 digits) is required.
              </div>
            </div>

            <div class="form-group">
              <label>Target Course (Async Validated) *</label>
              <select formControlName="courseId" class="form-control" [ngClass]="{'is-invalid': isInvalid('courseId')}">
                <option value="">-- Select Course --</option>
                <option *ngFor="let c of courses" [value]="c.id">
                  {{ c.title }} (\${{ c.price }})
                </option>
              </select>
              <div class="error-msg" *ngIf="isInvalid('courseId')">
                <span *ngIf="hasError('courseId', 'required')">Please select a course.</span>
                <span *ngIf="hasError('courseId', 'courseFull')">Selected course is currently at full capacity.</span>
              </div>
              <div class="valid-msg" *ngIf="enrollmentForm.get('courseId')?.pending">
                Verifying course availability...
              </div>
            </div>
          </div>

          <!-- Section 2: Dynamic FormArray for Qualifications -->
          <div class="section-title margin-top-large">
            <span>2. Academic Qualifications (Dynamic FormArray)</span>
            <button type="button" class="btn-add-item" (click)="addQualification()">+ Add Qualification</button>
          </div>

          <div formArrayName="qualifications" class="array-container">
            <div *ngFor="let item of qualifications.controls; let i = index" [formGroupName]="i" class="array-row">
              <div class="form-group flex-2">
                <label>Degree / Certificate #{{ i + 1 }}</label>
                <input type="text" formControlName="title" placeholder="e.g. B.Tech Computer Science" class="form-control" />
              </div>
              <div class="form-group flex-1">
                <label>Year</label>
                <input type="text" formControlName="year" placeholder="2024" class="form-control" />
              </div>
              <button type="button" class="btn-remove" (click)="removeQualification(i)">Remove</button>
            </div>

            <div *ngIf="qualifications.length === 0" class="empty-array-msg">
              No prior qualifications added. Click "+ Add Qualification" above.
            </div>
          </div>

          <!-- Section 3: Options & Terms -->
          <div class="section-title margin-top-large">3. Agreements</div>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="agreeTerms" />
              <span>I agree to the Digital Nurture 5.0 Training Code of Conduct *</span>
            </label>
            <div class="error-msg" *ngIf="isInvalid('agreeTerms')">
              You must accept terms to proceed.
            </div>
          </div>

          <!-- Live Form State Monitor -->
          <div class="form-monitor">
            <div>Form Status: <strong [ngClass]="enrollmentForm.valid ? 'text-green' : 'text-red'">{{ enrollmentForm.status }}</strong></div>
            <div>Dirty: <strong>{{ enrollmentForm.dirty }}</strong></div>
            <div>Touched: <strong>{{ enrollmentForm.touched }}</strong></div>
            <div>Qualifications Count: <strong>{{ qualifications.length }}</strong></div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-reset" (click)="resetForm()">Reset</button>
            <button type="submit" [disabled]="enrollmentForm.invalid" class="btn-submit">
              Submit Reactive Form
            </button>
          </div>

        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .reactive-form-page { display: flex; flex-direction: column; gap: 24px; }
    .page-title { font-size: 24px; color: #0f172a; margin: 0 0 4px 0; }
    .page-subtitle { color: #64748b; font-size: 13px; margin: 0; }

    .form-container { display: flex; flex-direction: column; gap: 14px; }
    .section-title {
      font-size: 14.5px; font-weight: 700; color: #059669; border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center;
    }
    .margin-top-large { margin-top: 16px; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 6px; }
    @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }

    .form-group { display: flex; flex-direction: column; gap: 5px; }
    .form-group label { color: #475569; font-size: 12.5px; font-weight: 500; }
    .form-control {
      background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 9px 12px;
      border-radius: 6px; font-size: 13.5px; outline: none; transition: border-color 0.2s;
    }
    .form-control:focus { border-color: #059669; }
    .form-control.is-invalid { border-color: #dc2626; }

    .error-msg { color: #dc2626; font-size: 11.5px; margin-top: 2px; }
    .valid-msg { color: #d97706; font-size: 11.5px; margin-top: 2px; }

    .btn-add-item {
      background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;
      padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .array-container { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
    .array-row { display: flex; gap: 12px; align-items: flex-end; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; }
    .flex-2 { flex: 2; }
    .flex-1 { flex: 1; }
    .btn-remove { background: transparent; border: 1px solid #fca5a5; color: #dc2626; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; margin-bottom: 2px; }
    .empty-array-msg { font-size: 12.5px; color: #94a3b8; font-style: italic; padding: 6px 0; }

    .checkbox-group { margin-top: 8px; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; color: #334155; font-size: 13px; cursor: pointer; }
    .checkbox-label input { width: 15px; height: 15px; accent-color: #059669; }

    .form-monitor {
      display: flex; gap: 20px; background: #f8fafc; padding: 10px 14px; border-radius: 6px;
      border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; margin-top: 10px;
    }
    .text-green { color: #059669; }
    .text-red { color: #dc2626; }

    .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
    .btn-reset { background: transparent; border: 1px solid #cbd5e1; color: #64748b; padding: 8px 18px; border-radius: 6px; cursor: pointer; }
    .btn-submit { background: #059669; border: none; color: #fff; padding: 8px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class ReactiveFormComponent implements OnInit, CanComponentDeactivate {
  enrollmentForm!: FormGroup;
  courses: Course[] = [];
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.courseService.getCourses().subscribe(c => this.courses = c);

    this.route.queryParams.subscribe(params => {
      if (params['courseId']) {
        this.enrollmentForm.patchValue({ courseId: Number(params['courseId']) });
      }
    });
  }

  private initForm(): void {
    this.enrollmentForm = this.fb.group({
      fullName: ['Milind Verma', [Validators.required, Validators.minLength(3)]],
      email: ['milind.verma@cognizant.com', [Validators.required, cognizantEmailValidator]],
      phone: ['9876543210', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      courseId: ['', [Validators.required], [asyncCourseCheckValidator]],
      qualifications: this.fb.array([
        this.createQualificationGroup('B.Tech Computer Science', '2024')
      ]),
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  get qualifications(): FormArray {
    return this.enrollmentForm.get('qualifications') as FormArray;
  }

  createQualificationGroup(title: string = '', year: string = ''): FormGroup {
    return this.fb.group({
      title: [title, Validators.required],
      year: [year, Validators.required]
    });
  }

  addQualification(): void {
    this.qualifications.push(this.createQualificationGroup());
  }

  removeQualification(index: number): void {
    this.qualifications.removeAt(index);
  }

  isInvalid(controlName: string): boolean {
    const control = this.enrollmentForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(controlName: string, errorName: string): boolean {
    return !!this.enrollmentForm.get(controlName)?.hasError(errorName);
  }

  resetForm(): void {
    this.enrollmentForm.reset();
  }

  canDeactivate(): boolean {
    if (this.enrollmentForm.dirty && !this.isSubmitted) {
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      const val = this.enrollmentForm.value;
      const newEnrollment = {
        studentId: 1,
        courseId: Number(val.courseId),
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active' as const,
        notes: `Reactive form. Qualifications: ${val.qualifications.map((q: any) => q.title).join(', ')}`
      };

      this.enrollmentService.addEnrollment(newEnrollment).subscribe(() => {
        this.isSubmitted = true;
        alert('Reactive form enrollment completed successfully!');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}

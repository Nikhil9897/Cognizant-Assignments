import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CardComponent } from '../../shared/card/card.component';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, HighlightDirective],
  template: `
    <div class="profile-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Student Profile Portal</h1>
          <p class="page-subtitle">Two-Way Data Binding with [(ngModel)] & FormsModule</p>
        </div>
        <button class="btn-toggle" (click)="toggleEdit()">
          {{ isEditing ? 'View Profile' : 'Edit Profile' }}
        </button>
      </div>

      <div class="profile-layout" *ngIf="student">
        <!-- Sidebar Card -->
        <app-card>
          <div class="avatar-card">
            <div class="avatar-circle">
              <span>MV</span>
            </div>
            <h2 class="student-name">{{ student.name }}</h2>
            <span class="student-role">Full Stack Java & Angular Trainee</span>
            <span class="student-id">ID: #DN50-{{ student.id }}</span>

            <div class="stats-mini">
              <div>
                <span class="stat-num">{{ student.enrolledCourses.length }}</span>
                <span class="stat-lbl">Courses Enrolled</span>
              </div>
              <div class="divider"></div>
              <div>
                <span class="stat-num">98%</span>
                <span class="stat-lbl">Completion Rate</span>
              </div>
            </div>
          </div>
        </app-card>

        <!-- Profile Details / Edit Form -->
        <app-card class="main-card">
          <!-- View Mode -->
          <div class="profile-details" *ngIf="!isEditing">
            <h3>Personal Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Full Name</label>
                <span>{{ student.name }}</span>
              </div>
              <div class="info-item">
                <label>Email Address</label>
                <span>{{ student.email }}</span>
              </div>
              <div class="info-item">
                <label>Phone Number</label>
                <span>{{ student.phone }}</span>
              </div>
              <div class="info-item">
                <label>Bio Summary</label>
                <span>{{ student.bio }}</span>
              </div>
            </div>

            <h3 class="section-divider">Enrolled Course IDs</h3>
            <div class="enrolled-badges">
              <span *ngFor="let cId of student.enrolledCourses" class="c-badge" appHighlight="#ecfdf5">
                Course #{{ cId }}
              </span>
            </div>
          </div>

          <!-- Edit Mode with Two-Way Binding -->
          <div class="profile-edit" *ngIf="isEditing">
            <h3>Update Profile Information</h3>
            <form (ngSubmit)="saveProfile()" #profileForm="ngForm">
              <div class="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  [(ngModel)]="student.name"
                  name="name"
                  required
                  class="form-control" />
              </div>

              <div class="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  [(ngModel)]="student.email"
                  name="email"
                  required
                  class="form-control" />
              </div>

              <div class="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  [(ngModel)]="student.phone"
                  name="phone"
                  required
                  class="form-control" />
              </div>

              <div class="form-group">
                <label>Bio</label>
                <textarea
                  [(ngModel)]="student.bio"
                  name="bio"
                  rows="3"
                  class="form-control"></textarea>
              </div>

              <!-- Real-time Two-Way Binding Preview -->
              <div class="live-preview">
                <h4>[(ngModel)] Live Preview:</h4>
                <p><strong>Name:</strong> {{ student.name }}</p>
                <p><strong>Email:</strong> {{ student.email }}</p>
              </div>

              <div class="form-actions">
                <button type="button" class="btn-cancel" (click)="toggleEdit()">Cancel</button>
                <button type="submit" [disabled]="!profileForm.valid" class="btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; }
    .page-title { font-size: 24px; color: #0f172a; margin: 0 0 4px 0; }
    .page-subtitle { color: #64748b; font-size: 13px; margin: 0; }
    .btn-toggle {
      background: #ffffff; border: 1px solid #059669; color: #059669; padding: 8px 16px;
      border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .btn-toggle:hover { background: #059669; color: #ffffff; }

    .profile-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; }
    @media (max-width: 800px) { .profile-layout { grid-template-columns: 1fr; } }

    .avatar-card { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
    .avatar-circle {
      width: 72px; height: 72px; border-radius: 50%; background: #059669; color: #ffffff;
      display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700;
    }
    .student-name { color: #0f172a; margin: 8px 0 0 0; font-size: 17px; }
    .student-role { font-size: 12px; color: #64748b; }
    .student-id { font-size: 11px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 4px; font-weight: 600; }

    .stats-mini { display: flex; align-items: center; justify-content: space-around; width: 100%; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
    .stat-num { display: block; font-size: 18px; font-weight: 700; color: #0f172a; }
    .stat-lbl { font-size: 11px; color: #64748b; }
    .divider { width: 1px; height: 28px; background: #e2e8f0; }

    .profile-details h3, .profile-edit h3 { color: #0f172a; margin-top: 0; font-size: 16px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 12px; }
    .info-item { display: flex; flex-direction: column; gap: 3px; }
    .info-item label { font-size: 12px; color: #64748b; font-weight: 500; }
    .info-item span { color: #0f172a; font-size: 13.5px; font-weight: 500; }
    .section-divider { margin-top: 24px; }
    .enrolled-badges { display: flex; gap: 8px; flex-wrap: wrap; }
    .c-badge { font-size: 12px; color: #047857; padding: 6px 12px; border-radius: 6px; border: 1px solid #a7f3d0; font-weight: 500; }

    .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
    .form-group label { color: #475569; font-size: 12.5px; font-weight: 500; }
    .form-control {
      background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 9px 12px;
      border-radius: 6px; font-size: 13.5px; outline: none; transition: border-color 0.2s;
    }
    .form-control:focus { border-color: #059669; }

    .live-preview { padding: 12px 14px; border-radius: 6px; background: #ecfdf5; border: 1px solid #a7f3d0; margin: 14px 0; }
    .live-preview h4 { color: #047857; margin: 0 0 6px 0; font-size: 13px; }
    .live-preview p { color: #334155; font-size: 12.5px; margin: 3px 0; }

    .form-actions { display: flex; justify-content: flex-end; gap: 10px; }
    .btn-cancel { background: transparent; border: 1px solid #cbd5e1; color: #64748b; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .btn-save { background: #059669; border: none; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-save:disabled { opacity: 0.5; }
  `]
})
export class StudentProfileComponent implements OnInit {
  student: Student | null = null;
  isEditing: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudent(1).subscribe(data => {
      this.student = data;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.student) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        alert('Student profile updated successfully!');
        this.isEditing = false;
      });
    }
  }
}

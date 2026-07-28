import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { CardComponent } from '../../../shared/card/card.component';
import { CourseFilterPipe } from '../../../pipes/course-filter.pipe';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardComponent,
    CourseFilterPipe,
    TruncatePipe
  ],
  template: `
    <div class="courses-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Course Catalog</h1>
          <p class="page-subtitle">Parent-Child Communication, Custom Pipes & Two-Way Binding</p>
        </div>
        <button class="add-btn" (click)="toggleAddModal()">+ Add New Course</button>
      </div>

      <!-- Controls & Filter Bar -->
      <div class="controls-bar">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search courses by title or instructor..."
            class="search-input" />
        </div>

        <div class="category-select-wrapper">
          <label>Category:</label>
          <select [(ngModel)]="selectedCategory" class="category-select">
            <option value="All">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Testing">Testing</option>
          </select>
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div class="courses-grid">
        <app-card *ngFor="let course of (courses | courseFilter:selectedCategory)" [elevated]="true">
          <div class="course-item" *ngIf="matchesSearch(course)">
            <div class="course-item__banner">
              <span class="category-tag">{{ course.category }}</span>
              <span class="price-tag">\${{ course.price }}</span>
            </div>

            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-desc">{{ course.description | truncate:110 }}</p>

            <div class="course-meta">
              <span>Duration: {{ course.duration }}</span>
              <span>Instructor: {{ course.instructor }}</span>
              <span class="rating">Rating: {{ course.rating }}</span>
            </div>

            <div class="course-actions">
              <a [routerLink]="['/courses', course.id]" [queryParams]="{ ref: 'catalog', view: 'full' }" class="btn-details">
                View Details
              </a>
              <button class="btn-delete" (click)="deleteCourse(course.id)">Delete</button>
            </div>
          </div>
        </app-card>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" *ngIf="showAddModal">
        <div class="modal-card">
          <h2>Create New Course</h2>
          <form (ngSubmit)="saveCourse()" #courseForm="ngForm">
            <div class="form-group">
              <label>Title</label>
              <input type="text" [(ngModel)]="newCourse.title" name="title" required class="form-input" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="newCourse.description" name="description" required class="form-input"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Instructor</label>
                <input type="text" [(ngModel)]="newCourse.instructor" name="instructor" required class="form-input" />
              </div>
              <div class="form-group">
                <label>Category</label>
                <select [(ngModel)]="newCourse.category" name="category" class="form-input">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Duration</label>
                <input type="text" [(ngModel)]="newCourse.duration" name="duration" placeholder="e.g. 6 Weeks" class="form-input" />
              </div>
              <div class="form-group">
                <label>Price ($)</label>
                <input type="number" [(ngModel)]="newCourse.price" name="price" class="form-input" />
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="toggleAddModal()">Cancel</button>
              <button type="submit" [disabled]="!courseForm.valid" class="btn-save">Save Course</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .courses-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; }
    .page-title { font-size: 24px; color: #0f172a; margin: 0 0 4px 0; }
    .page-subtitle { color: #64748b; font-size: 13px; margin: 0; }
    .add-btn {
      background: #059669; color: #fff; border: none; padding: 10px 18px;
      border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; transition: background 0.2s;
    }
    .add-btn:hover { background: #047857; }

    .controls-bar {
      display: flex; gap: 20px; align-items: center; justify-content: space-between;
      background: #ffffff; padding: 16px 20px; border-radius: 8px; border: 1px solid #e2e8f0;
    }
    .search-box { flex-grow: 1; max-width: 450px; }
    .search-input {
      background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 9px 14px;
      border-radius: 6px; font-size: 13.5px; width: 100%; outline: none; transition: border-color 0.2s;
    }
    .search-input:focus { border-color: #059669; }
    .category-select-wrapper { display: flex; align-items: center; gap: 8px; color: #475569; font-size: 13px; }
    .category-select {
      background: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; padding: 8px 12px;
      border-radius: 6px; font-size: 13px; outline: none;
    }

    .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .course-item { display: flex; flex-direction: column; gap: 10px; height: 100%; }
    .course-item__banner { display: flex; justify-content: space-between; align-items: center; }
    .category-tag { font-size: 11px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
    .price-tag { font-size: 14px; font-weight: 700; color: #059669; }
    .course-title { font-size: 16px; color: #0f172a; margin: 0; }
    .course-desc { font-size: 13px; color: #475569; line-height: 1.5; margin: 0; flex-grow: 1; }
    .course-meta { display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: #64748b; }
    .rating { color: #d97706; font-weight: 600; }
    .course-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
    .btn-details {
      color: #059669; text-decoration: none; font-size: 13px; font-weight: 600;
      padding: 6px 14px; background: #ecfdf5; border-radius: 6px; transition: all 0.2s ease;
    }
    .btn-details:hover { background: #059669; color: #fff; }
    .btn-delete { background: transparent; border: 1px solid #fca5a5; color: #dc2626; padding: 4px 10px; border-radius: 4px; font-size: 12px; cursor: pointer; }
    .btn-delete:hover { background: #fef2f2; }

    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15,23,42,0.5); display: flex; align-items: center; justify-content: center; z-index: 999;
    }
    .modal-card {
      background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; width: 480px; max-width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    }
    .modal-card h2 { color: #0f172a; margin-top: 0; font-size: 18px; }
    .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
    .form-group label { color: #475569; font-size: 12.5px; font-weight: 500; }
    .form-input {
      background: #f8fafc; border: 1px solid #cbd5e1; color: #0f172a; padding: 9px; border-radius: 6px; font-size: 13px; outline: none;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
    .btn-cancel { background: transparent; border: 1px solid #cbd5e1; color: #64748b; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .btn-save { background: #059669; border: none; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-save:disabled { opacity: 0.5; }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  showAddModal: boolean = false;

  newCourse: Omit<Course, 'id'> = {
    title: '',
    description: '',
    instructor: '',
    duration: '4 Weeks',
    rating: 4.5,
    category: 'Frontend',
    image: '',
    price: 99,
    enrolled: 0
  };

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }

  matchesSearch(course: Course): boolean {
    if (!this.searchTerm.trim()) return true;
    const term = this.searchTerm.toLowerCase();
    return course.title.toLowerCase().includes(term) || course.instructor.toLowerCase().includes(term);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.courses = this.courses.filter(c => c.id !== id);
      });
    }
  }

  toggleAddModal(): void {
    this.showAddModal = !this.showAddModal;
  }

  saveCourse(): void {
    this.courseService.addCourse(this.newCourse).subscribe(added => {
      this.courses.push(added);
      this.toggleAddModal();
    });
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Student Course Portal — Home'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard — Student Course Portal'
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/course-list/course-list.component').then(m => m.CourseListComponent),
    title: 'Catalog — Student Course Portal'
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
    title: 'Course Detail — Student Course Portal'
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile.component').then(m => m.StudentProfileComponent),
    canActivate: [authGuard],
    title: 'Student Profile — Student Course Portal'
  },
  {
    path: 'enroll',
    loadComponent: () => import('./pages/enrollment/template-form/template-form.component').then(m => m.TemplateFormComponent),
    title: 'Enrollment (Template) — Student Course Portal'
  },
  {
    path: 'enroll/reactive',
    loadComponent: () => import('./pages/enrollment/reactive-form/reactive-form.component').then(m => m.ReactiveFormComponent),
    canDeactivate: [unsavedChangesGuard],
    title: 'Enrollment (Reactive) — Student Course Portal'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 Page Not Found'
  }
];

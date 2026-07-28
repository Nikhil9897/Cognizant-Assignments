# 🎓 Student Course Portal — Angular 20 Enterprise Application

A production-ready Angular application developed for **Cognizant Digital Nurture 5.0 (Java Full Stack Engineering)**.

---

## ⚡ Connected Features & Services Overview

| Feature | Description & Technical Implementation |
| :--- | :--- |
| **Authentication Engine** | Mock JWT login via JSON Server (`http://localhost:3001/users`). Session stored in `localStorage`. |
| **Analytics Dashboard** | Live stats calculated via RxJS Streams. Demonstrates `ngOnInit`, `ngAfterViewInit`, and `ngOnDestroy`. |
| **Course Catalog & CRUD** | Search, category filtering, add course modal (`POST`), and delete course (`DELETE`). |
| **Course Details View** | Parametric routing (`/courses/:id`) and query parameters (`?ref=catalog&view=full`). |
| **Student Profile** | Protected by `authGuard` (`CanActivate`). Two-way binding with `[(ngModel)]` and `PUT` persistence. |
| **Template-Driven Form** | Built-in directives (`#form="ngForm"`, `#nameModel="ngModel"`), validation, and submission. |
| **Reactive Registration Engine** | `FormGroup`, `FormControl`, `FormArray`, custom sync (`cognizantEmailValidator`), and async (`asyncCourseCheckValidator`) validators. Guarded by `unsavedChangesGuard` (`CanDeactivate`). |
| **HTTP Interceptors** | `authInterceptor` (Authorization header), `loadingInterceptor` (global spinner), `errorInterceptor` (retry & error dialogs). |
| **NgRx State Store** | Actions, Reducers, Selectors for course state management. |

---

## 🚀 How to Run the Webpage & Connect Front-end & Backend

### Prerequisites
Make sure Node.js is installed.

### Step 1: Start Backend API (Port 3001)
In terminal inside `WEEK_7/Angular/student-course-portal`:
```bash
npm run server
```
*JSON Server runs at `http://localhost:3001` with pre-populated courses, students, users, and enrollments.*

### Step 2: Start Angular Web App (Port 4200)
In a second terminal inside `WEEK_7/Angular/student-course-portal`:
```bash
npm start
```
*Angular app launches at `http://localhost:4200`.*

---

## 🔑 Login Credentials

- **Email:** `milind.verma@cognizant.com`
- **Password:** `password123`

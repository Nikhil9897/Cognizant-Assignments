import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3001/courses';

  constructor(private http: HttpClient) {}

  // GET all courses — demonstrates map, tap, catchError, retry
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => console.log(`Fetched ${courses.length} courses`)),
      map(courses => courses.sort((a, b) => b.rating - a.rating)),
      catchError(this.handleError)
    );
  }

  // GET single course by ID — demonstrates switchMap pattern
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      tap(course => console.log(`Fetched course: ${course.title}`)),
      catchError(this.handleError)
    );
  }

  // GET courses by category — demonstrates map with filter
  getCoursesByCategory(category: string): Observable<Course[]> {
    return this.getCourses().pipe(
      map(courses => courses.filter(c => c.category === category))
    );
  }

  // POST — create a new course
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => console.log(`Added course: ${newCourse.title}`)),
      catchError(this.handleError)
    );
  }

  // PUT — update an existing course
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      tap(updated => console.log(`Updated course: ${updated.title}`)),
      catchError(this.handleError)
    );
  }

  // DELETE — remove a course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted course with id: ${id}`)),
      catchError(this.handleError)
    );
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    console.error('CourseService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

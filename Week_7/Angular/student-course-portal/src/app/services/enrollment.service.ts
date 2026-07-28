import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3001/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      retry(2),
      tap(enrollments => console.log(`Fetched ${enrollments.length} enrollments`)),
      catchError(this.handleError)
    );
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addEnrollment(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment).pipe(
      tap(e => console.log(`New enrollment created: ${e.id}`)),
      catchError(this.handleError)
    );
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollment).pipe(
      tap(e => console.log(`Updated enrollment: ${e.id}`)),
      catchError(this.handleError)
    );
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted enrollment: ${id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('EnrollmentService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

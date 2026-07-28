import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3001/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      retry(2),
      tap(students => console.log(`Fetched ${students.length} students`)),
      catchError(this.handleError)
    );
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      tap(student => console.log(`Fetched student: ${student.name}`)),
      catchError(this.handleError)
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student).pipe(
      tap(updated => console.log(`Updated student: ${updated.name}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('StudentService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

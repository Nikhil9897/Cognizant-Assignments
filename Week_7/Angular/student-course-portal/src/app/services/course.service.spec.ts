import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const dummyCourses: Course[] = [
    {
      id: 1,
      title: 'Angular 20',
      description: 'Desc 1',
      instructor: 'Inst 1',
      duration: '4 weeks',
      rating: 4.8,
      category: 'Frontend',
      image: '',
      price: 100,
      enrolled: 50
    },
    {
      id: 2,
      title: 'Spring Boot 3',
      description: 'Desc 2',
      instructor: 'Inst 2',
      duration: '6 weeks',
      rating: 4.5,
      category: 'Backend',
      image: '',
      price: 150,
      enrolled: 80
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all courses via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].title).toBe('Angular 20');
    });

    const req = httpMock.expectOne('http://localhost:3001/courses');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  it('should fetch a single course by ID', () => {
    service.getCourse(1).subscribe(course => {
      expect(course.title).toBe('Angular 20');
    });

    const req = httpMock.expectOne('http://localhost:3001/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses[0]);
  });
});

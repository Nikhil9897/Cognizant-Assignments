import { CourseFilterPipe } from './course-filter.pipe';
import { Course } from '../models/course.model';

describe('CourseFilterPipe', () => {
  const pipe = new CourseFilterPipe();
  const dummyCourses: Course[] = [
    { id: 1, title: 'Angular', category: 'Frontend', description: '', instructor: '', duration: '', rating: 4, image: '', price: 10, enrolled: 1 },
    { id: 2, title: 'Spring', category: 'Backend', description: '', instructor: '', duration: '', rating: 4, image: '', price: 10, enrolled: 1 }
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all courses if category is "All"', () => {
    const result = pipe.transform(dummyCourses, 'All');
    expect(result.length).toBe(2);
  });

  it('should filter courses by category name', () => {
    const result = pipe.transform(dummyCourses, 'Frontend');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Angular');
  });
});

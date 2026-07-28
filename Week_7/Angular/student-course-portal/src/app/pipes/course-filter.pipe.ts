import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name: 'courseFilter',
  standalone: true
})
export class CourseFilterPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    if (!courses || !category || category === 'All') {
      return courses;
    }
    return courses.filter(course =>
      course.category.toLowerCase() === category.toLowerCase()
    );
  }
}

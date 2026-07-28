import { CourseState } from './course.reducer';

export const selectAllCourses = (state: CourseState) => state.courses;
export const selectCoursesLoading = (state: CourseState) => state.loading;
export const selectCoursesError = (state: CourseState) => state.error;
export const selectTopRatedCourses = (state: CourseState) =>
  [...state.courses].sort((a, b) => b.rating - a.rating).slice(0, 3);

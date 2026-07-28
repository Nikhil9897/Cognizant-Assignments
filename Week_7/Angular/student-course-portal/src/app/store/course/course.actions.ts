import { Course } from '../../models/course.model';

// --- Action Types ---
export enum CourseActionTypes {
  LOAD_COURSES = '[Course] Load Courses',
  LOAD_COURSES_SUCCESS = '[Course] Load Courses Success',
  LOAD_COURSES_FAILURE = '[Course] Load Courses Failure',
  ADD_COURSE = '[Course] Add Course',
  DELETE_COURSE = '[Course] Delete Course'
}

export interface LoadCoursesAction {
  type: CourseActionTypes.LOAD_COURSES;
}

export interface LoadCoursesSuccessAction {
  type: CourseActionTypes.LOAD_COURSES_SUCCESS;
  payload: Course[];
}

export interface LoadCoursesFailureAction {
  type: CourseActionTypes.LOAD_COURSES_FAILURE;
  payload: string;
}

export interface AddCourseAction {
  type: CourseActionTypes.ADD_COURSE;
  payload: Course;
}

export interface DeleteCourseAction {
  type: CourseActionTypes.DELETE_COURSE;
  payload: number;
}

export type CourseActions =
  | LoadCoursesAction
  | LoadCoursesSuccessAction
  | LoadCoursesFailureAction
  | AddCourseAction
  | DeleteCourseAction;

import { Course } from '../../models/course.model';
import { CourseActions, CourseActionTypes } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export function courseReducer(state: CourseState = initialCourseState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_COURSES:
      return { ...state, loading: true, error: null };

    case CourseActionTypes.LOAD_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.payload };

    case CourseActionTypes.LOAD_COURSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CourseActionTypes.ADD_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };

    case CourseActionTypes.DELETE_COURSE:
      return { ...state, courses: state.courses.filter(c => c.id !== action.payload) };

    default:
      return state;
  }
}

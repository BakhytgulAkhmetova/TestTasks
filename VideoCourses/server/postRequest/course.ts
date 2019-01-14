import { Course } from '../entities/Course';

export const add = (course: Course, courses: Array<Course>): void => {
    courses.push(course);
};

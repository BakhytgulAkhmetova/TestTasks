import { Course } from '../entities/Course';

export const add = (course: Course, courses: Array<Course>): void => {
    console.log(courses);
    courses.push(course);
};

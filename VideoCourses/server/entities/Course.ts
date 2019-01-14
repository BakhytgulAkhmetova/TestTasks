import { Guid } from "guid-typescript";

import { CourseInterface } from '../interfaces';
import { Duration } from './Duration';
import { Author } from './Author'


export class Course implements CourseInterface {
    name: string;
    description: string;
    date: number;
    duration: number;
    idsAuthor: Array<number>;
    id: Guid;
    constructor (course: CourseInterface) {
        this.name = course.name;
        this.description = course.description;
        this.date = course.date;
        this.duration = course.duration;
        this.idsAuthor = course.idsAuthor;
        this.id = Guid.create();
    }
}

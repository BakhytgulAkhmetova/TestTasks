import { Guid } from "guid-typescript";

import { Duration } from './entities/Duration';
import { Author } from './entities/Author';

export interface Person {
    id: number,
    lastName: string,
    firstName:string
}

export interface FormAuthentication {
    login: string,
    password: string
}

export interface TimeDuration {
    hours: number,
    minutes: number
}

export interface CourseInterface {
    name: string,
    description: string,
    date: Date,
    duration: Duration,
    authorList: Array<Author>,
    id?: Guid
}

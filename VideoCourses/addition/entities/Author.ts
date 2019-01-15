import { Person } from '../interfaces';

export class Author implements Person {
    id: number;
    lastName: string;
    firstName: string
}

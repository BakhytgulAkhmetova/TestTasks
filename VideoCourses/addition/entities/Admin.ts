import { FormAuthentication } from '../interfaces';

export class Admin implements FormAuthentication {
    login: string;
    password: string;
}
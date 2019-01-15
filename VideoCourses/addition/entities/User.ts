import { FormAuthentication } from '../interfaces';

export class User implements FormAuthentication {
    login: string;
    password: string;
}

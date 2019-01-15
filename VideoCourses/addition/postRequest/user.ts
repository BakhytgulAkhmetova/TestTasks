import { isAuthenticated, createToken } from '../tokenFunctions';
import { FormAuthentication } from '../interfaces';

export const authenticate = (form: FormAuthentication ) => {
    const result  = isAuthenticated(form)? createToken(form): null;
    return result;
};

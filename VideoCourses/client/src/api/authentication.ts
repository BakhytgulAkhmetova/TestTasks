import { InterfaceLoginForm } from '../interfaces';
import { baseUrl, headerPostRequest } from './constants';

export const authenticationFetch = async (loginForm: InterfaceLoginForm) => {
    const response = await fetch( baseUrl.concat('/auth/login'), {
        method: 'POST',
        headers: headerPostRequest,
        body: JSON.stringify(loginForm) });
    return response.json();
}

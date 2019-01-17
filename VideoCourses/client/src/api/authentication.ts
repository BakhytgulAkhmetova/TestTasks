import { InterfaceLoginForm } from '../interfaces';
import { baseUrl } from './constants';

export const authenticationFetch = async (loginForm: InterfaceLoginForm) => {
    const response = await fetch( baseUrl.concat('/auth/login'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm) });
    const json = response.json();
    return json;
}

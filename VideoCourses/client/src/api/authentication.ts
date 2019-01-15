import { InterfaceLoginForm } from '../interfaces';

export const authenticationFetch = async (loginForm: InterfaceLoginForm) => {
    debugger;
    const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
        body: JSON.stringify(loginForm) });
        console.log(res);
    return res;
}

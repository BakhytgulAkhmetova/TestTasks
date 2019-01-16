import { InterfaceLoginForm } from '../interfaces';

export const authenticationFetch = async (loginForm: InterfaceLoginForm) => {
    debugger;
    const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm) });
    const json = response.json();
    console.log(json);
    return json;
}

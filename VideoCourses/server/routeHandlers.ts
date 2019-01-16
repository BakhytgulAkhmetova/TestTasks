import { isAuthenticated, createToken } from './tokenFunctions';

export const loginHandler = async (req, res) => {
    const form = {
        login: req.body.login,
        password: req.body.password
    };
    const result = await isAuthenticated(form)? createToken(form): null;
    console.log(form);
    console.log(result);
     result? res.status(200).json(result) 
    :res.status(200).json({ status: 401, message: 'Incorrect login or password' });
}

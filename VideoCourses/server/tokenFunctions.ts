import  * as constants  from './constants';
import { FormAuthentication } from './interfaces';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const userdb = JSON.parse(fs.readFileSync('./db/user.json', 'UTF-8'));

export const createToken = (payload: FormAuthentication) => {
    return jwt.sign(payload, constants.SECRET_KEY, { expiresIn: constants.expiresIn })
}
  
export const isAuthenticated = (form: FormAuthentication) => {
    return userdb.users.findIndex(user => user.login === form.login && user.password === form.password) !== -1
}

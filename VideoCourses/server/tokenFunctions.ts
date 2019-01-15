import  * as constants  from './constants';
import { FormAuthentication } from './interfaces';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

export const createToken = (payload: FormAuthentication) => {
    return jwt.sign(payload, constants.SECRET_KEY, { expiresIn: constants.expiresIn })
}
  
export const isAuthenticated = (form: FormAuthentication) => {
    return db.users.findIndex(user => user.login === form.login && user.password === form.password) !== -1
}

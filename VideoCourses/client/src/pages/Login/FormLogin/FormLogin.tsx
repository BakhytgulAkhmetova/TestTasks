import React, { ChangeEventHandler } from 'react';
import { InterfaceLoginForm } from '../../../interfaces';

import './FormLogin.scss';

interface OwnProps {
    loginForm: InterfaceLoginForm,
    handleChangeLogin: ChangeEventHandler,
    handleChangePassword: ChangeEventHandler,
    handleLogIn: any
}

export const FormLogin: React.SFC<OwnProps> = (props) => {
    const { loginForm, handleChangeLogin, handleChangePassword, handleLogIn } = props;

    return(
        <form className='form-login'>  
            <div className='form-login__control-log'>
               <label htmlFor='login'>Логин:</label>
               <input id='login' type='text' value={loginForm.login} onChange={handleChangeLogin}/>
               <span>введите</span>
            </div> 
            <div className='form-login__control-pas'>
                <label htmlFor='password'>Пароль:</label>
                <input id='password' type='password' value={loginForm.password} onChange={handleChangePassword}/>
                <span>введите</span>
            </div>
            <button className='form-login__button' onClick={handleLogIn}>Войти</button>
        </form>
    );
}

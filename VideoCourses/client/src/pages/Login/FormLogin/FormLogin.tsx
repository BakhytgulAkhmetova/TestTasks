import React from 'react';
import classnames from 'classnames';

import './FormLogin.scss';


interface InterfaceLoginFormValidated {
    login: {
        hasErrors: boolean,
        value: ''
    },
    password: {
        hasErrors: boolean,
        value: ''
    },
    hasErrors: boolean,
    incorrectData: boolean
}

interface OwnProps {
    loginForm: InterfaceLoginFormValidated,
    handleChangeInputForm: any,
    handleBlurFieldForm:(e:React.FocusEvent<HTMLInputElement>) => void
    handleLogIn: any
}

export const FormLogin: React.SFC<OwnProps> = (props) => {
    const { loginForm, handleBlurFieldForm, handleChangeInputForm, handleLogIn } = props;
    return(
        <form className='form-login'>  
                {
                    loginForm.incorrectData?
                        <div className='error'>Не верно введен логин или пароль</div>: null
                }
            <div className='form-login__control-log'>
               <label htmlFor='login'>Логин:</label>
               <input name='login'
                        id='login'
                        type='text'
                        value={loginForm.login.value} 
                        onBlur={ handleBlurFieldForm }
                        className={classnames({ 'error-input': loginForm.login.hasErrors })}
                        onChange={handleChangeInputForm}/>
                        {
                            loginForm.login.hasErrors?
                            <span className={classnames({ 'error': loginForm.login.hasErrors })}>
                            * Введите</span>: null
                        }
            </div> 
            <div className='form-login__control-pas'>
                <label htmlFor='password'>Пароль:</label>
                <input name='password'
                        id='password'
                        type='password' 
                        value={loginForm.password.value}
                        onBlur={ handleBlurFieldForm }
                        className={classnames({ 'error-input': loginForm.password.hasErrors })}
                        onChange={handleChangeInputForm}/>
                        {
                            loginForm.password.hasErrors?
                            <span className={classnames({ 'error': loginForm.password.hasErrors })}>
                                * Введите</span>: null
                        }
            </div>
            <button 
                type='button'
                disabled={loginForm.hasErrors}
                className='form-login__button'
                onClick={handleLogIn}>Войти</button>
        </form>
    );
}

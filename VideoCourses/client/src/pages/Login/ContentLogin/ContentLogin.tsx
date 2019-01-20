import React, { ChangeEventHandler } from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FormLogin } from '../FormLogin';
import { login } from '../../../store/authentication/asyncActions';
import { loginSuccess } from '../../../store/authentication/actionCreators';
import { Validator, } from '../../../validation/validator';
import { default as types } from '../../../validation/typesError';
import { loginForm } from '../../../validation/validationConfig';

import './ContentLogin.scss';

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
    contentStyle: string,
    loginForm: InterfaceLoginFormValidated,
    handleChangeInputForm: ChangeEventHandler,
    handleBlurFieldForm:(e:React.FocusEvent<HTMLInputElement>) => void,
    handleLogIn: any,
    propsContent: any,
    onLogIn: Function ,
    changeLoginForm: Function,
    history: any
}
     
interface DispatchProps {
    onLogIn: () => void
}
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    onLogIn: async () => { 
       const { propsContent, history, loginForm, changeLoginForm } = ownProps;
       const form = {
           login: loginForm.login.value,
           password: loginForm.password.value

        };
       const json: any = await dispatch(login(form));
       if(json['token']) {
        await localStorage.setItem('token', json['token']);
        dispatch(loginSuccess());
        propsContent.handleChangeLayoutLogin(form.login);
        history.push('/courses');
        }
        else {
            changeLoginForm({
                ...loginForm,
                password: { value: '', hasErrors: true },
                hasErrors: true,
                incorrectData: true
            });
        }
    }
});

const handlers = {
    handleChangeInputForm: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { loginForm, changeLoginForm } = props;
        const field = event.currentTarget.name;
        const value = event.currentTarget.value;
        changeLoginForm({ ...loginForm, [field]: { value, hasErrors: false }, incorrectData: false });

    },
    handleBlurFieldForm: (props: OwnProps) => (e:React.FocusEvent<HTMLInputElement>) => {
        const { loginForm, changeLoginForm } = props;
        const field = e.currentTarget.name;
        const value = e.currentTarget.value;
        const hasErrors = validate(field, value).errors.length !== 0;

        changeLoginForm({ ...loginForm, [field]: { value, hasErrors }, hasErrors });
    },
    handleLogIn: (props: OwnProps) => () => {
        props.onLogIn();
    }
}

const validator = new Validator({ types, config: loginForm });

const validate = (field: string, input: string) => {
    validator.cleanListErrors();

    validator.validate({ [field]: { value: input } });

    return { errors: validator.listErrors[0].msgs, value: input || '' };
};

const ContentLogin: React.SFC<OwnProps> = (props) => {
    const { contentStyle, loginForm,
        handleBlurFieldForm,
        handleChangeInputForm, handleLogIn } = props;
    const contentClass = classnames('content-login', contentStyle);
    return(
        <div className={contentClass}>
            <FormLogin 
            handleBlurFieldForm={handleBlurFieldForm}
            handleLogIn={handleLogIn}
            handleChangeInputForm={handleChangeInputForm}
            loginForm={loginForm}/>
        </div>
    );
};

export default compose<OwnProps, {}> (
    withRouter,
    withState('loginForm', 'changeLoginForm', {
        login: { value: '', hasErrors: false },
        password: { value: '', hasErrors: false },
        hasErrors: false,
        incorrectData: false
    }),
    connect(null, mapDispatchToProps),
    withHandlers(handlers)
)(ContentLogin);

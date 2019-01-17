import React, { ChangeEventHandler } from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FormLogin } from '../FormLogin';
import { InterfaceLoginForm } from '../../../interfaces';
import { login } from '../../../store/authentication/asyncActions';

import './ContentLogin.scss';
import { async } from 'q';

interface OwnProps {
    contentStyle: string,
    loginForm: InterfaceLoginForm,
    handleChangeLogin: ChangeEventHandler,
    handleChangePassword: ChangeEventHandler,
    handleLogIn: any,
    onLogIn: Function ,
    changeLoginForm: Function,
    history: any
}
     
interface DispatchProps {
    onLogIn: (loginForm: InterfaceLoginForm) => void
}
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    onLogIn: async (loginForm: InterfaceLoginForm) => { 
        await dispatch(login(loginForm));
        ownProps.history.push('/courses');
    }
});

const handlers = {
    handleChangeLogin: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        props.changeLoginForm({...props.loginForm, login: event.currentTarget.value});

    },
    handleChangePassword: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        props.changeLoginForm({...props.loginForm, password: event.currentTarget.value});

    },
    handleLogIn: (props: OwnProps) => () => {
        props.onLogIn(props.loginForm);
    }
}

const ContentLogin: React.SFC<OwnProps> = (props) => {
    const { contentStyle, loginForm, handleChangeLogin, handleChangePassword, handleLogIn } = props;
    const contentClass = classnames('content-login', contentStyle);
    return(
        <div className={contentClass}>
            <FormLogin 
            handleLogIn={handleLogIn}
            handleChangeLogin={handleChangeLogin}
            handleChangePassword={handleChangePassword}
            loginForm={loginForm}/>
        </div>
    );
};

export default compose<OwnProps, {}> (
    withRouter,
    connect(null, mapDispatchToProps),
    withState('loginForm', 'changeLoginForm', {
        login: '',
        password: ''
    }),
    withHandlers(handlers)
)(ContentLogin);

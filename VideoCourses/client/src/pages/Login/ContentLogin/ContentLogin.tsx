import React, { ChangeEventHandler } from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { FormLogin } from '../FormLogin';
import { InterfaceLoginForm } from '../../../interfaces';
import { login } from '../../../store/authentication/asyncActions';

import './ContentLogin.scss';

interface OwnProps {
    contentStyle: string,
    isAuthenticated: boolean,
    loginForm: InterfaceLoginForm,
    handleChangeLogin: ChangeEventHandler,
    handleChangePassword: ChangeEventHandler,
    handleLogIn: any,
    onLogIn: Function ,
    changeLoginForm: Function
}

interface StateProps {
    isAuthenticated: boolean
}
     
interface DispatchProps {
    onLogIn: (loginForm: InterfaceLoginForm) => void
}

const mapStateToProps = (state: any): StateProps => ({
    isAuthenticated: state.authentication.isAuthenticated
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    onLogIn: (loginForm: InterfaceLoginForm) => { dispatch(login(loginForm))}
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
    connect(mapStateToProps, mapDispatchToProps),
    withState('loginForm', 'changeLoginForm', {
        login: '',
        password: ''
    }),
    withHandlers(handlers)
)(ContentLogin);
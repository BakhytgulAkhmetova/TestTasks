import Redux from 'redux';

import { InterfaceLoginForm} from '../../interfaces';
import { authenticationFetch } from '../../api/authentication';
import { loginSuccess, loginRequest } from '../authentication/actionCreators';

export  const login = (loginForm: InterfaceLoginForm) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(loginRequest());
          const json = await authenticationFetch(loginForm);
          if(json['token']) {
             await localStorage.setItem('login', loginForm.login);
             await localStorage.setItem('token', json['token']);
              dispatch(loginSuccess(loginForm.login));
          }
    };
};

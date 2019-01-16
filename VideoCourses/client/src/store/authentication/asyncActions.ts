import Redux from 'redux';

import { InterfaceLoginForm} from '../../interfaces';
import { authenticationFetch } from '../../api/authentication';
// import { loginSuccess } from '../authentication/actionCreators';

export  const login = (loginForm: InterfaceLoginForm) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          const json = await authenticationFetch(loginForm);
          json['token']? localStorage.setItem('token', json['token']): null;
          console.log(localStorage);
    };
};

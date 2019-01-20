import Redux from 'redux';

import { InterfaceLoginForm} from '../../interfaces';
import { authenticationFetch } from '../../api/authentication';
import { loginRequest } from '../authentication/actionCreators';

export  const login = (loginForm: InterfaceLoginForm) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(loginRequest());
          return await authenticationFetch(loginForm);
    };
};

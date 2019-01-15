import Redux from 'redux';

import { InterfaceLoginForm} from '../../interfaces';
import { authenticationFetch } from '../../api/authentication';
import { loginSuccess } from '../authentication/actionCreators';

export  const login = (loginForm: InterfaceLoginForm) => {
    return async (dispatch: Redux.Dispatch<any>) => {
        debugger;
          const json = await authenticationFetch(loginForm);
          dispatch(loginSuccess());
    };
};

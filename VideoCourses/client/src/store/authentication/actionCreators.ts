import * as actions from './actions';

export const loginRequest = () => {
    return { type: actions.LOG_IN_REQUEST };
};

export const loginSuccess = () => {
    return { type: actions.LOG_IN_SUCCESS };
};

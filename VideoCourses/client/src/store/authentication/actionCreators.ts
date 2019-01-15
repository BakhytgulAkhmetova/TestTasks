import * as actions from './actions';

export const loginSuccess = () => {
    return { type: actions.LOG_IN_SUCCESS };
};

export const logoff = () => {
    return { type: actions.LOG_OFF };
};

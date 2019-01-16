import { InterfaceAction } from '../../interfaces';
import { initialState } from './initialState';
import * as types from './actions';

const authentication = (state = initialState, action: InterfaceAction) => {
    switch (action.type) {
        // case types.LOG_IN_SUCCESS:
        //     return {
        //         ...state,
        //         isAuthenticated: !state.isAuthenticated
        //     };

        // case types.LOG_OFF:
        //     return {
        //         ...state,
        //         isAuthenticated: !state.isAuthenticated
        //     };
        default:
            return state;
    }
};

export default authentication;

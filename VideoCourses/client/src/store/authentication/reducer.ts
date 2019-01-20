import { InterfaceAction } from '../../interfaces';
import * as types from './actions';

const authentication = (state = { isLoading: false }, action: InterfaceAction) => {
    switch (action.type) {
        case types.LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.LOG_IN_SUCCESS:
            return {
                ...state,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
};

export default authentication;

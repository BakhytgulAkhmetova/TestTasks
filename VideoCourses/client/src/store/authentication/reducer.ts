import { InterfaceAction } from '../../interfaces';
import * as types from './actions';

const authentication = (state = { isLoading: false, login: '' }, action: InterfaceAction) => {
    switch (action.type) {
        case types.LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.LOG_IN_SUCCESS:
            return {
                ...state,
                isLoading: !state.isLoading,
                login: action.payload
            };
        default:
            return state;
    }
};

export default authentication;

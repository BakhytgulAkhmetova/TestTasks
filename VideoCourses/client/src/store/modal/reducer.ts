import { default as initialStateModal } from './initialState';
import * as types from './actions';

import { InterfaceAction } from '../../interfaces';

export const modal = (state = initialStateModal, action: InterfaceAction) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case types.FILL_HEADER:
            return {
                ...state,
                header: action.payload
            };
        case types.FILL_CONTENT:
            return {
                ...state,
                content: action.payload
            };
        case types.CHANGE_STYLE:
            return {
                ...state,
                styleContent: action.payload
            };
        case types.CLOSE_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
};

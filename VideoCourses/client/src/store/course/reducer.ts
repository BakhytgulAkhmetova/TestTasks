import { InterfaceAction } from '../../interfaces';
import * as types from './actions';

import { default as initialState } from './initialState';

const course = (state = initialState, action: InterfaceAction) => {
    switch (action.type) {
        case types.GET_COURSE_LIST_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.GET_COURSE_LIST_SUCCESS:
            return {
                ...state,
                courseList: action.payload,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
};

export default course;

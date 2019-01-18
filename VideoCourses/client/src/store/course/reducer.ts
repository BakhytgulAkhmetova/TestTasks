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
                courseList: action.payload.map((c:any) => {
                    return { ...c, authorList: { from: [], to: c.idsAuthor }}
                }),
                isLoading: !state.isLoading
            };
        case types.GET_COURSE_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.GET_COURSE_BY_ID_SUCCESS:
        debugger;
            return {
                ...state,
                courseForm: {
                    ...action.payload,
                    authorList: { from: [], to: action.payload.idsAuthor }
                },
                isLoading: !state.isLoading
            };
        case types.ADD_COURSE_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.ADD_COURSE_SUCCESS:
            return {
                ...state,
                courseList: (state.courseList as any[]).concat([action.payload]),
                isLoading: !state.isLoading
            };
        case types.EDIT_COURSE_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.EDIT_COURSE_SUCCESS:
        const arrModified = (state.courseList as any[]).slice(0);
        const index = arrModified.findIndex(el=> el.id === action.payload.id);
        arrModified.splice(index, 1, action.payload.course);
            return {
                ...state,
                courseList: arrModified,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
};

export default course;

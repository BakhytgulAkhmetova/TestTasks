import { InterfaceAction } from '../../interfaces';
import * as types from './actions';

import { default as initialState } from './initialState';

export const course = (state = initialState, action: InterfaceAction) => {
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
                    return { ...c, authorList: { from: [], to: c.idsAuthor || [] }}
                }),
                isLoading: !state.isLoading
            };

        case types.GET_COURSE_LIST_BY_SEARCH_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.GET_COURSE_LIST_BY_SEARCH_SUCCESS:
            return {
                ...state,
                courseList: action.payload.map((c:any) => {
                    return { ...c, authorList: { from: [], to: c.idsAuthor || [] }}
                }),
                isLoading: !state.isLoading
            };
        case types.GET_COURSE_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.GET_COURSE_BY_ID_SUCCESS:
            return {
                ...state,
                courseForm: {
                    ...action.payload,
                    authorList: { from: [], to: action.payload.idsAuthor || [] }
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
            isLoading: !state.isLoading
        };
        case types.DELETE_COURSE_REQUEST:
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case types.DELETE_COURSE_SUCCESS:
        const arr = (state.courseList as any[]).slice(0);
        const i = arr.findIndex(el=> el.id === action.payload);
        arr.splice(i, 1);
            return {
                ...state,
                courseList: arr,
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
        arrModified.splice(index, 1, action.payload);
            return {
                ...state,
                courseList: arrModified,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
};

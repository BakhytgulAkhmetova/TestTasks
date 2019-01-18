import * as actions from './actions';
import { InterfaceCourse } from '../../interfaces';

export const getCourseListRequest = () => {
    return { type: actions.GET_COURSE_LIST_REQUEST };
};

export const getCourseListSuccess = (payload: Array<InterfaceCourse>) => {
    return { 
        type: actions.GET_COURSE_LIST_SUCCESS,
        payload
     };
};

export const getCourseByIdRequest = () => {
    return { type: actions.GET_COURSE_BY_ID_REQUEST };
};

export const getCourseByIdSuccess = (payload: InterfaceCourse) => {
    return { 
        type: actions.GET_COURSE_BY_ID_SUCCESS,
        payload
     };
};

export const addCourseRequest = () => {
    return { type: actions.ADD_COURSE_REQUEST };
};

export const addCourseSuccess = (payload: any) => {
    return { 
        type: actions.ADD_COURSE_SUCCESS,
        payload
     };
};

export const editCourseRequest = () => {
    return { type: actions.EDIT_COURSE_REQUEST };
};

export const editCourseSuccess = (payload: any) => {
    return { 
        type: actions.EDIT_COURSE_SUCCESS,
        payload
     };
};

export const getCourseListBySearchRequest = () => {
    return { type: actions.GET_COURSE_LIST_BY_SEARCH_REQUEST };
};

export const getCourseListBySearchSuccess = (payload: Array<InterfaceCourse>) => {
    return { 
        type: actions.GET_COURSE_LIST_BY_SEARCH_SUCCESS,
        payload
     };
};

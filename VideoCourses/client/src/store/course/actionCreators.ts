import * as actions from './actions';
import {InterfaceCourse } from '../../interfaces';

export const getCourseListRequest = () => {
    return { type: actions.GET_COURSE_LIST_REQUEST };
};

export const getCourseListSuccess = (payload: Array<InterfaceCourse>) => {
    return { 
        type: actions.GET_COURSE_LIST_SUCCESS,
        payload
     };
};

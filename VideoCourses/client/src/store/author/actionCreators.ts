import * as actions from './actions';
import {InterfaceCourse } from '../../interfaces';

export const getAuthorListRequest = () => {
    return { type: actions.GET_AUTHOR_LIST_REQUEST };
};

export const getAuthorListSuccess = (payload: Array<InterfaceCourse>) => {
    return { 
        type: actions.GET_AUTHOR_LIST_SUCCESS,
        payload
     };
};

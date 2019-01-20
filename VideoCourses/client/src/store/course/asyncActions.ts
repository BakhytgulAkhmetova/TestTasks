import Redux from 'redux';
import uniqid from 'uniqid';

import { getCourseListFetch, deleteCourseFetch, addCourseFetch, getCourseByIdFetch, editCourseFetch, getCourseListByNameFetch, getCourseListByDateFetch } from '../../api/course';
import { InterfaceCourse } from '../../interfaces';
import * as actionCreators from '../course/actionCreators';

export  const getCourseList = () => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.getCourseListRequest());
          const result = await getCourseListFetch();
          dispatch(actionCreators.getCourseListSuccess(result));
    };
};

export  const getCourseById = (id: any) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.getCourseByIdRequest());
          const result = await getCourseByIdFetch(id);
          dispatch(actionCreators.getCourseByIdSuccess(result));
    };
};

export  const deleteCourse = (id: any) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.deleteCourseRequest());
          await deleteCourseFetch(id);
          dispatch(actionCreators.deleteCourseSuccess(id));
    };
};

export  const addCourse = (course: InterfaceCourse ) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.addCourseRequest());
          const courseAdd = {
            name: course.name,
            id: uniqid(),
            description: course.description,
            date: course.date,
            duration: course.duration,
            idsAuthor: course.authorList.to.map(a => a.id)
          }
          await addCourseFetch(courseAdd);
          dispatch(actionCreators.addCourseSuccess(courseAdd));
    };
};
export  const editCourse = (id: any, course: InterfaceCourse ) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.editCourseRequest());
          const courseEdit = {
            name: course.name,
            description: course.description,
            date: course.date,
            duration: course.duration,
            idsAuthor: course.authorList.to.map(a => a.id)
          }
          await editCourseFetch(id, courseEdit);
          dispatch(actionCreators.editCourseSuccess(course));
    };
};

export  const getCourseListByName = (param: string) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(actionCreators.getCourseListBySearchRequest());
          const resultFirst = await getCourseListByNameFetch(param);
          const result =  resultFirst.length? resultFirst: await getCourseListByDateFetch(param);
          dispatch(actionCreators.getCourseListBySearchSuccess(result));
    };
};

import Redux from 'redux';
import uniqid from 'uniqid';

import { getCourseListFetch, addCourseFetch, getCourseByIdFetch, editCourseFetch } from '../../api/course';
import { InterfaceCourse } from '../../interfaces';
import { getCourseListRequest, getCourseListSuccess,
         getCourseByIdRequest, getCourseByIdSuccess,
         editCourseRequest, editCourseSuccess,
        addCourseRequest, addCourseSuccess } from '../course/actionCreators';

export  const getCourseList = () => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(getCourseListRequest());
          const result = await getCourseListFetch();
          dispatch(getCourseListSuccess(result));
    };
};

export  const getCourseById = (id: any) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(getCourseByIdRequest());
          const result = await getCourseByIdFetch(id);
          dispatch(getCourseByIdSuccess(result));
    };
};

export  const addCourse = (course: InterfaceCourse ) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(addCourseRequest());
          const courseAdd = {
            name: course.name,
            id: uniqid(),
            description: course.description,
            date: course.date,
            duration: course.duration,
            idsAuthor: course.authorList.to.map(a => a.id)
          }
          await addCourseFetch(courseAdd);
          dispatch(addCourseSuccess(courseAdd));
    };
};
export  const editCourse = (id: any, course: InterfaceCourse ) => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(editCourseRequest());
          const courseEdit = {
            name: course.name,
            description: course.description,
            date: course.date,
            duration: course.duration,
            idsAuthor: course.authorList.to.map(a => a.id)
          }
          await editCourseFetch(id, courseEdit);
          dispatch(editCourseSuccess(course));
    };
};

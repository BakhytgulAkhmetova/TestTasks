import Redux from 'redux';

import { getCourseListFetch } from '../../api/course';
import { getCourseListRequest, getCourseListSuccess } from '../course/actionCreators';

export  const getCourseList = () => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(getCourseListRequest());
          const result = await getCourseListFetch();
          dispatch(getCourseListSuccess(result));
    };
};

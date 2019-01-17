import Redux from 'redux';

import { getAuthorListFetch } from '../../api/author';
import { getAuthorListRequest, getAuthorListSuccess } from '../author/actionCreators';

export  const getAuthorList = () => {
    return async (dispatch: Redux.Dispatch<any>) => {
          dispatch(getAuthorListRequest());
          const result = await getAuthorListFetch();
          dispatch(getAuthorListSuccess(result));
    };
};

import { combineReducers } from 'redux';

import { default as authentication } from './authentication/reducer';
import { default as course } from './course/reducer';
import { default as author } from './author/reducer';
import { default as modal } from './modal/reducer';

export const reducer = combineReducers({
    authentication,
    course,
    author,
    modal
});

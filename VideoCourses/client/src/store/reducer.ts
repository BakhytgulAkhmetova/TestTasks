import { combineReducers } from 'redux';

import { authentication } from './authentication/reducer';
import { course } from './course/reducer';
import { author } from './author/reducer';
import { modal } from './modal/reducer';

export const reducer = combineReducers({
    authentication,
    course,
    author,
    modal
});

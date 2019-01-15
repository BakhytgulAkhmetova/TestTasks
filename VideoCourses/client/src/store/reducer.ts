import { combineReducers } from 'redux';

import { default as authentication } from './authentication/reducer';

export const reducer = combineReducers({
    authentication
});
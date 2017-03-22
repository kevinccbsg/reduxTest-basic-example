import { combineReducers } from 'redux';

import tweets from './tweetsReducer';
import user from './userReducer';

const reducer = combineReducers({
  tweets,
  user
});

export default reducer;
import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { requests } from './requests.reducer';

const rootReducer = combineReducers({
  authentication,
  requests,
});

export default rootReducer;
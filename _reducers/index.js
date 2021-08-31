import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { requests } from './requests.reducer';
import { transport } from './transport.reducer';

const rootReducer = combineReducers({
  authentication,
  requests,
  transport
});

export default rootReducer;
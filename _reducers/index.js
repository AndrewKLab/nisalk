import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { requests } from './requests.reducer';
import { transport } from './transport.reducer';
import { notifications } from './notifications.reducer';

const rootReducer = combineReducers({
  authentication,
  requests,
  transport,
  notifications,
});

export default rootReducer;
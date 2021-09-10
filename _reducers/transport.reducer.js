import { transportConstants, userConstants } from '../_constants';

const initialState = {
  transports_loading: false,
  transports_error: null,
  transports: [],
};

export function transport(state = initialState, action) {
  switch (action.type) {
    //GET_TRANSPORTS
    case transportConstants.GET_TRANSPORTS_REQUEST:
      return {
        ...state,
        transports_loading: true,
        transports_error: null,
      };
    case transportConstants.GET_TRANSPORTS_SUCCESS:
      return {
        ...state,
        transports_loading: false,
        transports_error: null,
        transports: action.transports
      };
    case transportConstants.GET_TRANSPORTS_FAILURE:
      return {
        ...state,
        transports_loading: false,
        transports_error: action.error,
      };


    //LOGOUT
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

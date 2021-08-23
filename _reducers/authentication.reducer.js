import { userConstants } from '../_constants';

const initialState = {
  login_error: null,
  login_loading: false,
  validate_loading: false,
  validate_error: null,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    //SIGN-IN
    case userConstants.SIGNIN_REQUEST:
      return {
        ...state,
        signing: true,
        user: action.user,
        login_error: null,
        login_loading: true
      };
    case userConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        jwt: action.jwt,
        login_error: null,
        login_loading: false
      };
    case userConstants.SIGNIN_FAILURE:
      return {
        ...state,
        login_error: action.error,
        login_loading: false
      };

    //LOGOUT
    case userConstants.LOGOUT:
      return initialState;

    //GET_TOKEN
    case userConstants.GET_TOKEN:
      return {
        ...state,
        jwt: action.result,
      };

    //VALIDATE-USER
    case userConstants.VALIDATE_REQUEST:
      return {
        ...state,
        validate_loading: true,
        user: action.user,
      };
    case userConstants.VALIDATE_SUCCESS:
      return {
        ...state,
        validate_loading: false,
        jwt: action.user.jwt,
        user: action.user.user,
      };
    case userConstants.VALIDATE_FAILURE:
      return {
        ...state,
        validate_loading: false,
        validate_error: action.error
      };
    default:
      return state;
  }
}

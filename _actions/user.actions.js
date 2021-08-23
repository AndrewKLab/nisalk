import { userConstants } from '../_constants';
import { auntificationService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export const userActions = {
  signin,
  logout,
  validateToken,
  setInit,
};


function signin(phonenumber, password, navigation) {
  return (dispatch) => {
    dispatch(request({ phonenumber }));

    return auntificationService.signin(phonenumber, password)
      .then(
        (response) => {
          AsyncStorage.setItem('user', response.data.token)
          dispatch(success(response.data.token))
          dispatch(validateToken(response.data.token, navigation, false, null))
        }
      )
      .catch(error => {
        dispatch(failure(error.response.data.message))
      });
  };

  function request(user) {
    return { type: userConstants.SIGNIN_REQUEST, user };
  }
  function success(jwt) {
    return { type: userConstants.SIGNIN_SUCCESS, jwt };
  }
  function failure(error) {
    return { type: userConstants.SIGNIN_FAILURE, error };
  }
}

function logout(navigation) {
  auntificationService.logout().then(() => navigation.navigate('Login'));
  return { type: userConstants.LOGOUT };
}

function validateToken(jwt, navigation, firstlogin, setscreen) {
  return (dispatch) => {
    dispatch(request({ jwt }));
    return auntificationService.validateToken(jwt)
      .then(function (response) {
        const user = {
          jwt: jwt,
          user: response.data,
        };
        dispatch(success(user));
        if (firstlogin) {
          setscreen('Reqests')
        } else {
          navigation.navigate('Reqests')
        }
      }
      ).catch(function (error) {
        dispatch(failure(error.response.data.message));
        if (firstlogin) {
          setscreen('Login')
        }
      });
  };

  function request(user) {
    return { type: userConstants.VALIDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.VALIDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.VALIDATE_FAILURE, error };
  }

}

function setInit(result) {
  return { type: userConstants.GET_TOKEN, result };
}
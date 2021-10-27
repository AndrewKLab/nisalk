import { userConstants } from '../_constants';
import { auntificationService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const userActions = {
  setSource,
  signin,
  logout,
  validateToken,
  setInit,
};


function setSource(source) {
  console.log(source)
  AsyncStorage.setItem('source', source);
  return { type: userConstants.SET_SOURCE, source };
}

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
        if(error.response !== undefined){
          dispatch(failure(error.response.data.message))
        } else {
          dispatch(failure(error.message))
        }
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

function logout(token, navigation) {

  return (dispatch) => {
    return auntificationService.logout(token).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      dispatch(clear());
    }).catch(function (error) {
      console.log(error.response.data.message);
    });
  };

  function clear() {
    return { type: userConstants.LOGOUT };
  }

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
        AsyncStorage.setItem('userdata', JSON.stringify(response.data))
        dispatch(success(user));
        if (firstlogin) {
          setscreen('BottomTabNavigator');
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabNavigator' }],
          });
        }
      }
      ).catch(function (error) {
        if (firstlogin && error.message !== 'Network Error') {
          setscreen('Login')
        } else {
          AsyncStorage.getItem('userdata').then((value) => {
            if (value !== null) {
              dispatch(success(JSON.parse(value)))
            } else {
              dispatch(failure(error.message))
            }
          })
          setscreen('BottomTabNavigator');
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

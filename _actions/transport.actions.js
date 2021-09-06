import { userConstants } from '../_constants';
import { transportService } from '../_services';
import { transportConstants } from '../_constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const transportActions = {
    getTransports
};


function getTransports(jwt) {
  return (dispatch) => {
    dispatch(request({ jwt }));

    return transportService.getTransports(jwt)
      .then(
        (response) => {
            dispatch(success(response.data))
        }
      )
      .catch(error => {
        dispatch(failure(error.response.data.message))
      });
  };

  function request(jwt) {
    return { type: transportConstants.GET_TRANSPORTS_REQUEST, jwt };
  }
  function success(transports) {
    return { type: transportConstants.GET_TRANSPORTS_SUCCESS, transports };
  }
  function failure(error) {
    return { type: transportConstants.GET_TRANSPORTS_FAILURE, error };
  }
}
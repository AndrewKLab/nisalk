import { userConstants } from '../_constants';
import { transportService } from '../_services';
import { transportConstants } from '../_constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const transportActions = {
  getTransports,
  createRepairRequest,
  getRepairingTransport
};


function getTransports(jwt) {
  return (dispatch) => {
    dispatch(request({ jwt }));

    return transportService.getTransports(jwt)
      .then(
        (response) => {
          AsyncStorage.setItem('transports', JSON.stringify(response.data));
          dispatch(success(response.data))
        }
      )
      .catch(error => {
        AsyncStorage.getItem('transports').then((value) => {
          if (value !== null) {
            dispatch(success(JSON.parse(value)))
          } else {
            dispatch(failure(error.message))
          }
        })

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

function getRepairingTransport(jwt, ts_id) {
  return (dispatch) => {
    dispatch(request({ jwt }));

    return transportService.getRepairingTransport(jwt, ts_id)
      .then(
        (response) => {
          //AsyncStorage.setItem('transports', JSON.stringify(response.data));
          dispatch(success(response.data))
        }
      )
      .catch(error => {
        // AsyncStorage.getItem('transports').then((value) => {
        //   if (value !== null) {
        //     dispatch(success(JSON.parse(value)))
        //   } else {
        //     dispatch(failure(error.message))
        //   }
        // })
        dispatch(failure(error.message))
      });
  };

  function request(jwt) {
    return { type: transportConstants.GET_REPAIR_TRANSPORTS_REQUEST, jwt };
  }
  function success(transports) {
    return { type: transportConstants.GET_REPAIR_TRANSPORTS_SUCCESS, transports };
  }
  function failure(error) {
    return { type: transportConstants.GET_REPAIR_TRANSPORTS_FAILURE, error };
  }
}




function createRepairRequest(token, mn_date, mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id, openAlert) {
  return (dispatch) => {
    dispatch(request({ token }));
    return transportService.createRepairRequest(token, mn_date, mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id)
      .then(res => res.json())
      .then(function (result) {
        if (result.errors === undefined) {
          openAlert();
          dispatch(success(result));
        } else {
          openAlert(result.errors);
        }
      })
      .catch(error => {
        if (error.response !== undefined) {
          dispatch(failure(error.response.data.message))
          openAlert(error.response.data.message)
        } else {
          dispatch(failure(error.message))
          openAlert(error.message)
        }
      });
  };

  function request(token) {
    return { type: transportConstants.CREATE_REPAIR_REQUEST_REQUEST, token };
  }
  function success(message) {
    return { type: transportConstants.CREATE_REPAIR_REQUEST_SUCCESS, message };
  }
  function failure(error) {
    return { type: transportConstants.CREATE_REPAIR_REQUEST_FAILURE, error };
  }
}
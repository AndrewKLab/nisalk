import { requestsConstants } from '../_constants';
import { reqestsService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reqestsActions = {
  getReuests,
  getArchiveReuests,
  getReuestMessages,
  getMoreReuestMessages,
  sendMessage,
  readMessages,
  addMessage,
  createRequest
};

function getReuests(jwt) {
  return (dispatch) => {
    dispatch(request({ jwt }));
    return reqestsService.getReuests(jwt)
      .then(function (response) {
        AsyncStorage.setItem('requests', JSON.stringify(response.data));
        dispatch(success(response.data));
      }
      ).catch(function (error) {
        AsyncStorage.getItem('requests').then((value) => {
          if (value !== null) {
            dispatch(success(JSON.parse(value)))
          } else {
            dispatch(failure(error.message))
          }
        })
      });
  };

  function request(requests) {
    return { type: requestsConstants.GET_REQUESTS_REQUEST, requests };
  }
  function success(requests) {
    return { type: requestsConstants.GET_REQUESTS_SUCCESS, requests };
  }
  function failure(error) {
    return { type: requestsConstants.GET_REQUESTS_FAILURE, error };
  }
}

function getArchiveReuests(jwt) {
  return (dispatch) => {
    dispatch(request({ jwt }));
    return reqestsService.getArchiveReuests(jwt)
      .then(function (response) {
        AsyncStorage.setItem('closerequests', JSON.stringify(response.data));
        dispatch(success(response.data));
      }
      ).catch(function (error) {
        AsyncStorage.getItem('closerequests').then((value) => {
          if (value !== null) {
            dispatch(success(JSON.parse(value)))
          } else {
            dispatch(failure(error.message))
          }
        })
      });
  };

  function request(requests) {
    return { type: requestsConstants.GET_ARCHIVE_REQUESTS_REQUEST, requests };
  }
  function success(requests) {
    return { type: requestsConstants.GET_ARCHIVE_REQUESTS_SUCCESS, requests };
  }
  function failure(error) {
    return { type: requestsConstants.GET_ARCHIVE_REQUESTS_FAILURE, error };
  }
}

function getReuestMessages(jwt, req, offset, limit) {
  return (dispatch) => {

    dispatch(request(jwt, req));
    return reqestsService.getReuestMessages(jwt, req, offset, limit)
      .then(function (response) {
        dispatch(success(response.data));
        const o_mess_arr = response.data.messages.filter(mess => mess.type === "o");
        if (o_mess_arr.length > 0) {
          const o_mess = o_mess_arr[0];
          dispatch(readMessages(jwt, o_mess.type, o_mess.request_id, o_mess.o_id))
        }
      }).catch(function (error) {
        dispatch(failure(error.response.data.message));
      });
  };

  function request(jwt, req) {
    return { type: requestsConstants.GET_REQUEST_MESSAGES_REQUEST, jwt, req };
  }
  function success(request_messages) {
    return { type: requestsConstants.GET_REQUEST_MESSAGES_SUCCESS, request_messages };
  }
  function failure(error) {
    return { type: requestsConstants.GET_REQUEST_MESSAGES_FAILURE, error };
  }

}

function getMoreReuestMessages(jwt, req, offset, limit) {
  return (dispatch) => {

    dispatch(request(jwt, req));
    return reqestsService.getReuestMessages(jwt, req, offset, limit)
      .then(function (response) {
        dispatch(success(response.data));
      }).catch(function (error) {
        dispatch(failure(error.response.data.message));
      });
  };

  function request(jwt, req) {
    return { type: requestsConstants.GET_MORE_REQUEST_MESSAGES_REQUEST, jwt, req };
  }
  function success(request_messages) {
    return { type: requestsConstants.GET_MORE_REQUEST_MESSAGES_SUCCESS, request_messages };
  }
  function failure(error) {
    return { type: requestsConstants.GET_MORE_REQUEST_MESSAGES_FAILURE, error };
  }

}

function sendMessage(jwt, message, req, user, files) {
  return (dispatch) => {

    dispatch(request(jwt, message, req, files));
    return reqestsService.sendMessage(jwt, message, req, files)
      .then(res => res.json())
      .then(function (result) {
        if (result.errors === undefined) {
          dispatch(success(result.response, user, files));
        } else {
          alert(result.errors)
        }
      }
      ).catch(function (error) {
        console.log(error)
        dispatch(failure(error.message));
      });
  };

  function request(jwt, message, req, files) {
    return { type: requestsConstants.SEND_MESSAGE_REQUEST, jwt, message, req, files };
  }
  function success(message, user, files) {
    return { type: requestsConstants.SEND_MESSAGE_SUCCESS, message, user, files };
  }
  function failure(error) {
    return { type: requestsConstants.SEND_MESSAGE_FAILURE, error };
  }

}

function readMessages(jwt, type, req, message) {
  return (dispatch) => {
    dispatch(request(jwt, type, req, message));
    return reqestsService.readMessages(jwt, type, req, message)
      .then(function (response) {
        console.log(response.data)
        if (response.data.response === "Ok") {
          dispatch(success(message, req));
        }
      }
      ).catch(function (error) {
        dispatch(failure(error.response.data.message));
      });
  };

  function request(jwt, type, req, message) {
    return { type: requestsConstants.READ_MESSAGE_REQUEST, jwt, type, req, message };
  }
  function success(message, req) {
    return { type: requestsConstants.READ_MESSAGE_SUCCESS, message, req };
  }
  function failure(error) {
    return { type: requestsConstants.READ_MESSAGE_FAILURE, error };
  }

}

function addMessage(req, message, messagedata) {
  return { type: requestsConstants.ADD_MESSAGE, message, req, messagedata };
}

function createRequest(token, theme, message, org_id, mark, model, number, region, files, openAlert, user, requests_type) {
  return (dispatch) => {
    dispatch(request({ token }));
    return reqestsService.createRequest(token, theme, message, org_id, mark, model, number, region, files)
      .then(res => res.json())
      .then(function (result) {
        if (result.errors === undefined) {
          openAlert();
          if (requests_type === 'open') {
            dispatch(success(result.task_lk_id, result.task_lk_time_create, user, mark, model, number));
          }
        } else {
          dispatch(failure(result.errors))
          openAlert(result.errors);
        }
      })
      .catch(error => {
        if(error.response !== undefined){
          dispatch(failure(error.response.data.message))
          openAlert(error.response.data.message)
        } else {
          dispatch(failure(error.message))
          openAlert(error.message)
        }
      });
  };

  function request(token) {
    return { type: requestsConstants.CREATE_REQUEST_REQUEST, token };
  }
  function success(task_lk_id, task_lk_time_create, user, mark, model, number) {
    return { type: requestsConstants.CREATE_REQUEST_SUCCESS, task_lk_id, task_lk_time_create, user, mark, model, number };
  }
  function failure(error) {
    return { type: requestsConstants.CREATE_REQUEST_FAILURE, error };
  }
}


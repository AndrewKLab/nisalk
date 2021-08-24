import { requestsConstants } from '../_constants';
import { reqestsService } from '../_services';


export const reqestsActions = {
  getReuests,
  getReuestMessages,
  sendMessage,
  readMessages,
  addMessage
};

function getReuests(jwt) {
  return (dispatch) => {
    dispatch(request({ jwt }));
    return reqestsService.getReuests(jwt)
      .then(function (response) {
        dispatch(success(response.data));
      }
      ).catch(function (error) {
        dispatch(failure(error.response.data.message));
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

function getReuestMessages(jwt, req, navigation) {
  return (dispatch) => {

    dispatch(request(jwt, req));
    return reqestsService.getReuestMessages(jwt, req)
      .then(function (response) {
        dispatch(success(response.data));
        navigation.navigate('ReqestСhat', { request: req })
      }
      ).catch(function (error) {
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

function addMessage(req, message) {
    return { type: requestsConstants.ADD_MESSAGE, message, req };
}


import { requestsConstants } from '../_constants';
import { userConstants } from '../_constants';

const initialState = {
  requests_loading: false,
  requests_error: null,
  request_messages_loading: false,
  request_messages_error: null,
  send_message_error: null,

};

export function requests(state = initialState, action) {
  switch (action.type) {
    //GET_REQUESTS
    case requestsConstants.GET_REQUESTS_REQUEST:
      return {
        ...state,
        requests_loading: true,
        requests_error: null
      };
    case requestsConstants.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.requests,
        requests_loading: false,
        requests_error: null
      };
    case requestsConstants.GET_REQUESTS_FAILURE:
      return {
        ...state,
        requests_loading: false,
        requests_error: action.error
      };

    //GET_REQUEST_MESSAGES
    case requestsConstants.GET_REQUEST_MESSAGES_REQUEST:
      return {
        ...state,
        request_messages_error: null
      };
    case requestsConstants.GET_REQUEST_MESSAGES_SUCCESS:
      return {
        ...state,
        request_messages: action.request_messages,
        request_messages_error: null
      };
    case requestsConstants.GET_REQUEST_MESSAGES_FAILURE:
      return {
        ...state,
        request_messages_error: action.error
      };

    //SEND_MESSAGE
    case requestsConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        send_message_error: null
      };
    case requestsConstants.SEND_MESSAGE_SUCCESS:
      const m = state.request_messages.messages;
      m.push({
        type: "i",
        request_id: action.message.i_request_id,
        time: action.message.i_create_time,
        message: action.message.i_message,
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        middlename: action.user.middlename,
        files: action.message.i_files
      })
      return {
        ...state,
        request_messages: { ...state.request_messages, messages: m },
        request_messages_error: null
      };
    case requestsConstants.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        send_message_error: action.error
      };

    //SEND_MESSAGE
    case requestsConstants.READ_MESSAGE_REQUEST:
      return {
        ...state,
      };
    case requestsConstants.READ_MESSAGE_SUCCESS:
      console.log(action)
      return {
        ...state,
        request_messages: { ...state.request_messages, message_read: action.message, unread_messages: 0, },
        requests: state.requests.map((item, index) => item.task_lk_id === action.req ? { ...item, unread_messages: 0 } : item)
      };
    case requestsConstants.READ_MESSAGE_FAILURE:
      return {
        ...state,
      };
    case userConstants.LOGOUT:
      return initialState;

    case requestsConstants.ADD_MESSAGE:
      console.log( 'reducer ' + action.req, action.message)
      return {
        ...state,
        requests: state.requests.map((item, index) => item.task_lk_id == action.req ? { ...item, unread_messages: item.unread_messages + 1 } : item)
      };

    default:
      return state;
  }
}

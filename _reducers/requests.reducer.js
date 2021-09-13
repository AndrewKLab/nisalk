import { requestsConstants, userConstants } from '../_constants';
import moment from 'moment';

const initialState = {
  requests_type: 'open',

  requests_loading: false,
  requests_error: null,

  request_messages_loading: false,
  request_messages_error: null,
  request_messages_is_end: false,

  send_message_error: null,

  create_reqest_loading: false,
  create_reqest_error: null,
  create_reqest_status: '',

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
        requests_error: null,
        requests_type: 'open'
      };
    case requestsConstants.GET_REQUESTS_FAILURE:
      return {
        ...state,
        requests_loading: false,
        requests_error: action.error
      };

    //GET_ARCHIVE_REQUESTS
    case requestsConstants.GET_ARCHIVE_REQUESTS_REQUEST:
      return {
        ...state,
        requests_loading: true,
        requests_error: null
      };
    case requestsConstants.GET_ARCHIVE_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.requests,
        requests_loading: false,
        requests_error: null,
        requests_type: 'close'
      };
    case requestsConstants.GET_ARCHIVE_REQUESTS_FAILURE:
      return {
        ...state,
        requests_loading: false,
        requests_error: action.error
      };

    //GET_REQUEST_MESSAGES
    case requestsConstants.GET_REQUEST_MESSAGES_REQUEST:
      return {
        ...state,
        request_messages_loading: true,
        request_messages_error: null
      };
    case requestsConstants.GET_REQUEST_MESSAGES_SUCCESS:
      return {
        ...state,
        request_messages: action.request_messages,
        request_messages_loading: false,
        request_messages_error: null,
        request_messages_is_end: false,
      };
    case requestsConstants.GET_REQUEST_MESSAGES_FAILURE:
      return {
        ...state,
        request_messages_loading: false,
        request_messages_error: action.error
      };

    //GET_MORE_REQUEST_MESSAGES
    case requestsConstants.GET_MORE_REQUEST_MESSAGES_REQUEST:
      return {
        ...state,
        request_more_messages_loading: true,
        request_more_messages_error: null
      };
    case requestsConstants.GET_MORE_REQUEST_MESSAGES_SUCCESS:
      return {
        ...state,
        request_messages: { ...state.request_messages, messages: [...state.request_messages.messages, ...action.request_messages.messages] },
        request_more_messages_loading: false,
        request_more_messages_error: null,
        request_messages_is_end: action.request_messages.messages.length > 0 ? false : true,

      };
    case requestsConstants.GET_MORE_REQUEST_MESSAGES_FAILURE:
      return {
        ...state,
        request_more_messages_loading: false,
        request_more_messages_error: action.error
      };

    //SEND_MESSAGE
    case requestsConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        send_message_error: null
      };
    case requestsConstants.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        request_messages: {
          ...state.request_messages, messages: [
            {
              type: "i",
              request_id: action.message.i_request_id,
              time: action.message.i_create_time,
              message: action.message.i_message,
              firstname: action.user.firstname,
              lastname: action.user.lastname,
              middlename: action.user.middlename,
              files: action.message.i_files
            },
            ...state.request_messages.messages]
        },
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

      return {
        ...state,
        requests: state.requests.map((item, index) => item.task_lk_id == action.req ? { ...item, unread_messages: item.unread_messages + 1 } : item),
        request_messages: state.request_messages !== undefined ? state.request_messages.task_lk_id == action.req ? { ...state.request_messages, messages: [action.messagedata, ...state.request_messages.messages] } : state.request_messages : {}
      };

    //CREATE REQEST
    case requestsConstants.CREATE_REQUEST_REQUEST:
      return {
        ...state,
        create_reqest_loading: true,
        create_reqest_error: null,
      };
    case requestsConstants.CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        create_reqest_loading: false,
        create_reqest_error: null,
        requests: [{
          task_lk_id: action.task_lk_id,
          task_lk_status: null,
          task_lk_name: action.user.lastname + " " + action.user.firstname + " " + action.user.middlename,
          task_lk_mark: action.mark,
          task_lk_model: action.model,
          task_lk_number: action.number,
          task_lk_time_create: action.task_lk_time_create,
          unread_messages: 0
        }, ...state.requests],
      };
    case requestsConstants.CREATE_REQUEST_FAILURE:
      return {
        ...state,
        create_reqest_loading: false,
        create_reqest_error: action.error,
      };

    default:
      return state;
  }
}

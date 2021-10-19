import { transportConstants, userConstants } from '../_constants';

const initialState = {
  transports_loading: false,
  transports_error: null,
  transports: [],

  repairing_transport_loading: false,
  repairing_transport_error: null,
  repairing_transport: [],

  create_repair_reqest_loading: true,
  create_repair_reqest_message: null,
  create_repair_reqest_error: null,
  
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

    //GET_REPAIR_TRANSPORTS
    case transportConstants.GET_REPAIR_TRANSPORTS_REQUEST:
      return {
        ...state,
        repairing_transport_loading: true,
        repairing_transport_error: null,
      };
    case transportConstants.GET_REPAIR_TRANSPORTS_SUCCESS:
      return {
        ...state,
        repairing_transport_loading: false,
        repairing_transport_error: null,
        repairing_transport: action.transports
      };
    case transportConstants.GET_REPAIR_TRANSPORTS_FAILURE:
      return {
        ...state,
        repairing_transport_loading: false,
        repairing_transport_error: action.error,
      };


    //CREATE REQEST
    case transportConstants.CREATE_REPAIR_REQUEST_REQUEST:
      return {
        ...state,
        create_reqest_loading: true,
        create_reqest_error: null,
      };
    case transportConstants.CREATE_REPAIR_REQUEST_SUCCESS:
      return {
        ...state,
        create_reqest_loading: false,
        create_reqest_error: null,
        create_repair_reqest_message: action.message
        // requests: [{
        //   task_lk_id: action.task_lk_id,
        //   task_lk_status: null,
        //   task_lk_name: action.user.lastname + " " + action.user.firstname + " " + action.user.middlename,
        //   task_lk_mark: action.mark,
        //   task_lk_model: action.model,
        //   task_lk_number: action.number,
        //   task_lk_time_create: action.task_lk_time_create,
        //   unread_messages: 0
        // }, ...state.requests],
      };
    case transportConstants.CREATE_REPAIR_REQUEST_FAILURE:
      return {
        ...state,
        create_reqest_loading: false,
        create_reqest_error: action.error,
      };


    //LOGOUT
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

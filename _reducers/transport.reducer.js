import { transportConstants, userConstants } from '../_constants';

const initialState = {
  transports_loading: false,
  transports_error: null,
  transports: [],

  repairing_transport_loading: false,
  repairing_transport_error: null,
  repairing_transport: [],

  create_repair_reqest_loading: false,
  create_repair_reqest_message: null,
  create_repair_reqest_error: null,

  gas_filligs_transport_loading: false,
  gas_filligs_transport_error: null,
  gas_filligs_transport: [],

  create_fill_reqest_loading: false,
  create_fill_reqest_message: null,
  create_fill_reqest_error: null,

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


    //CREATE REPAIR REQEST
    case transportConstants.CREATE_REPAIR_REQUEST_REQUEST:
      return {
        ...state,
        create_repair_reqest_loading: true,
        create_repair_reqest_error: null,
      };
    case transportConstants.CREATE_REPAIR_REQUEST_SUCCESS:
      return {
        ...state,
        create_repair_reqest_loading: false,
        create_repair_reqest_error: null,
        create_repair_reqest_message: action.message
      };
    case transportConstants.CREATE_REPAIR_REQUEST_FAILURE:
      return {
        ...state,
        create_repair_reqest_loading: false,
        create_repair_reqest_error: action.error,
      };

    //GET GAS FILLINGS TRANSPORTS REQUEST
    case transportConstants.GET_GAS_FILLINGS_TRANSPORTS_REQUEST:
      return {
        ...state,
        gas_filligs_transport_loading: true,
        gas_filligs_transport_error: null,
      };
    case transportConstants.GET_GAS_FILLINGS_TRANSPORTS_SUCCESS:
      return {
        ...state,
        gas_filligs_transport_loading: false,
        gas_filligs_transport_error: null,
        gas_filligs_transport: action.transports
      };
    case transportConstants.GET_GAS_FILLINGS_TRANSPORTS_FAILURE:
      return {
        ...state,
        gas_filligs_transport_loading: false,
        gas_filligs_transport_error: action.error,
      };

    //CREATE FILL REQEST
    case transportConstants.CREATE_FILL_REQUEST_REQUEST:
      return {
        ...state,
        create_fill_reqest_loading: true,
        create_fill_reqest_error: null,
      };
    case transportConstants.CREATE_FILL_REQUEST_SUCCESS:
      return {
        ...state,
        create_fill_reqest_loading: false,
        create_fill_reqest_error: null,
        create_fill_reqest_message: action.message.message
      };
    case transportConstants.CREATE_FILL_REQUEST_FAILURE:
      return {
        ...state,
        create_fill_reqest_loading: false,
        create_fill_reqest_error: action.error,
      };


    //LOGOUT
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

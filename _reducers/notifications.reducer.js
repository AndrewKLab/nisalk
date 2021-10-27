import { notificationsConstants } from '../_constants';

const initialState = {
    notifications: [],
    notifications_loading: false,
    notifications_error: null,
};

export function notifications(state = initialState, action) {
    switch (action.type) {
        //GET_REQUESTS
        case notificationsConstants.GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                notifications_loading: true,
                notifications_error: null,
            };
        case notificationsConstants.GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications_loading: false,
                notifications_error: null,
                notifications: action.notifications,
            };
        case notificationsConstants.GET_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                notifications_loading: false,
                notifications_error: action.error,
            };

        default:
            return state;
    }
}

import { notificationsConstants } from '../_constants';
import { notificationsService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const notificationsActions = {
    getNotifications,
};

function getNotifications(token) {
  return (dispatch) => {
    dispatch(request({ token }));
    return notificationsService.getNotifications(token)
      .then(function (response) {
          console.log(response.data)
        AsyncStorage.setItem('notifications', JSON.stringify(response.data.notifications));
        dispatch(success(response.data.notifications));
      }
      ).catch(function (error) {
        AsyncStorage.getItem('notifications').then((value) => {
          if (value !== null) {
            dispatch(success(JSON.parse(value)))
          } else {
            dispatch(failure(error.message))
          }
        })
      });
  };

  function request(token) {
    return { type: notificationsConstants.GET_NOTIFICATIONS_REQUEST, token };
  }
  function success(notifications) {
    return { type: notificationsConstants.GET_NOTIFICATIONS_SUCCESS, notifications };
  }
  function failure(error) {
    return { type: notificationsConstants.GET_NOTIFICATIONS_FAILURE, error };
  }
}



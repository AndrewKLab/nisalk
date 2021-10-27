
import axios from 'axios';
import { store } from '../_helpers';

export const notificationsService = {
  getNotifications,
};

function getNotifications(token) {
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/notifications`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}


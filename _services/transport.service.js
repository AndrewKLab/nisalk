import AsyncStorage from '@react-native-async-storage/async-storage';
import { configApi } from './config';
import axios from 'axios';

export const transportService = {
  getTransports,
};

function getTransports(token) {
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/transport/list`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  return axios(config)
}
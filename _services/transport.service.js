import AsyncStorage from '@react-native-async-storage/async-storage';
import { configApi } from './config';
import axios from 'axios';

export const transportService = {
  getTransports,
  createRepairRequest,
  getRepairingTransport
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

function getRepairingTransport(token, ts_id) {
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/maintenance/get/${ts_id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  return axios(config)
}

function createRepairRequest(token, mn_date, mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id) {

  return fetch(
    `${configApi.apiUrl}/app/maintenance/save?mn_date=${mn_date}&mn_vid_rep=${mn_vid_rep}&mn_malfunction_id=${mn_malfunction_id}&mn_kilometrage=${mn_kilometrage}&mn_runing_time=${mn_runing_time}&mn_notes=${mn_notes}&mn_ts_id=${mn_ts_id}`,
    {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configApi } from './config';
import axios from 'axios';
import { getDiviceInfo, store } from '../_helpers';

export const transportService = {
  getTransports,
  getTransport,
  createRepairRequest,
  getRepairingTransport,
  createFillRequest,
  getGasFillingsTransport
};

function getTransports(token) {
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/transport/list`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  return axios(config)
}

function getTransport(token, lk_ts_id) {
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/transport/${lk_ts_id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}

function getRepairingTransport(token) {
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/maintenance/get`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  return axios(config)
}

function createRepairRequest(token, mn_date, mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id) {

  return fetch(
    `${store.getState().authentication.source}/app/maintenance/save?mn_date=${mn_date}&mn_vid_rep=${mn_vid_rep}&mn_malfunction_id=${mn_malfunction_id}&mn_kilometrage=${mn_kilometrage}&mn_runing_time=${mn_runing_time}&mn_notes=${mn_notes}&mn_ts_id=${mn_ts_id}`,
    {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
}

function getGasFillingsTransport(token) {
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/transport/fillings/list`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  return axios(config)
}

function createFillRequest(token, action, lk_gf_ts_id, lk_gf_data_source, lk_gf_id, date, time, lk_gf_fuel_type, lk_gf_fuel_filled_amount, lk_gf_notes) {
  console.log(`${store.getState().authentication.source}/transport/fillings/save?action=${action}&lk_gf_ts_id=${lk_gf_ts_id}&lk_gf_data_source=${lk_gf_data_source}&lk_gf_id=${lk_gf_id}&date=${date}&time=${time}&lk_gf_fuel_type=${lk_gf_fuel_type}&lk_gf_fuel_filled_amount=${lk_gf_fuel_filled_amount}&lk_gf_notes=${lk_gf_notes}`)
  return fetch(
    `${store.getState().authentication.source}/app/transport/fillings/save?action=${action}&lk_gf_ts_id=${lk_gf_ts_id}&lk_gf_data_source=${lk_gf_data_source}&lk_gf_id=${lk_gf_id}&date=${date}&time=${time}&lk_gf_fuel_type=${lk_gf_fuel_type}&lk_gf_fuel_filled_amount=${lk_gf_fuel_filled_amount}&lk_gf_notes=${lk_gf_notes}`,
    {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
}
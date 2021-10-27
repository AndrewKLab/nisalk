import AsyncStorage from '@react-native-async-storage/async-storage';
import { configApi } from './config';
import axios from 'axios';
import { getDiviceInfo, store } from '../_helpers';

export const auntificationService = {
  signin,
  logout,
  validateToken,
};

function signin(username, password) {



  return getDiviceInfo().then((res) => {
    var formdata = new FormData();
    formdata.append('mac', res.mac)
    formdata.append('token', res.token)
    formdata.append('model', res.model)
    formdata.append("username", username);
    formdata.append("password", password);
    var config = {
      method: 'post',
      url: `${store.getState().authentication.source}/login`,
      data: formdata
    };
    return axios(config)
  });


}

function validateToken(token) {
  console.log(store.getState().authentication.source)
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${store.getState().authentication.source}/app/user`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  return axios(config)
}

function logout(token) {

  return getDiviceInfo().then((res) => {
    var formdata = new FormData();
    formdata.append('mac', res.mac)
    var config = {
      method: 'post',
      url: `${store.getState().authentication.source}/logout`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formdata
    };
    return axios(config).then(()=>{
      AsyncStorage.removeItem('user');
    })
  });

}


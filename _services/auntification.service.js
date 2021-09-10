import AsyncStorage from '@react-native-async-storage/async-storage';
import { configApi } from './config';
import axios from 'axios';
import { getDiviceInfo } from '../_helpers';

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
      url: `${configApi.apiUrl}/login`,
      data: formdata
    };
    return axios(config)
  });


}

function validateToken(token) {
  var data = new FormData();
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/user`,
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
      url: `${configApi.apiUrl}/logout`,
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


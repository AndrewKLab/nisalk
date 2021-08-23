import { configApi } from './config';
import axios from 'axios';
import FormData from 'form-data';

export const reqestsService = {
  getReuests,
  getReuestMessages,
  sendMessage,
  readMessages
};

function getReuests(token) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/requests`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}

function getReuestMessages(token, req) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/messages/${req}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}

function sendMessage(token, message, req, files) {

  // If file selected then create FormData
  const fileToUpload = files;
  const data = new FormData();
  if (files.length > 0) {
    for (var i = 0; i < fileToUpload.length; i++) {
      data.append('file[]', fileToUpload[i]);
    }
  } else {
    // If no file selected the show alert
    data.append('nofile[]', "")
  }
  // Please change file upload URL
  return fetch(
    `${configApi.apiUrl}/app/message/save?text_message=${message}&request_id=${req}`,
    {
      method: 'post',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data; ',
      },
    }
  );


}

function readMessages(token, type, req, message) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/message/read/${type}/${req}/${message}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}




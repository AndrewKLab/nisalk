import { configApi } from './config';
import axios from 'axios';
import FormData from 'form-data';

export const reqestsService = {
  getReuests,
  getArchiveReuests,
  getReuestMessages,
  sendMessage,
  readMessages,
  createRequest
};

function getReuests(token) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/requests/work`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}

function getArchiveReuests(token) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/requests/archive`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };

  return axios(config)
}

function getReuestMessages(token, req, offset, limit) {
  var config = {
    method: 'get',
    url: `${configApi.apiUrl}/app/messages/lazyload/${req}/${offset}/${limit}`,
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


function createRequest(token, theme, message, org_id, mark, model, number, region, files) {
  const fileToUpload = files;
  const data = new FormData();
  if (files.length > 0) {
    console.log(token, theme, message, org_id, mark, model, number, region, files);
    for (var i = 0; i < fileToUpload.length; i++) {
      data.append('file[]', fileToUpload[i]);
    }
  } else {
    console.log("files");
    // If no file selected the show alert
    data.append('nofile[]', "")
  }

  return fetch(
    `${configApi.apiUrl}/app/request/save?theme=${theme}&message=${message}&org_id=${org_id}&mark=${mark}&model=${model}&number=${number}&region=${region}`,
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

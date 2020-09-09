import axios from 'axios';

const endPoint = 'http://localhost:3000';
const baseURL = 'http://localhost:3000';
let url = '';
const headers = { 'Content-Type': 'application/json' };

function makeServerRequest(server_call, params) {
  switch (server_call) {
    case 'get_activities':
      url = `${endPoint}/activities/v1`;
      return get_function(url);
      break;
    case 'post':
      url = `${endPoint}/post`;
      const post_data = { test: params.test };
      return post_function(url, headers, post_data);
      break;
  }
}

function get_function(url) {
  console.log(url);

  const request = axios({
    method: 'get',
    headers,
    url,
    baseURL,
  });

  return request;
}

function post_function(url, headers, data) {
  console.log(url);

  const request = axios({
    method: 'post',
    headers,
    url,
    data,
    baseURL,
  });

  return request;
}

export { makeServerRequest };

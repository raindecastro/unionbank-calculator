import axios from 'axios';
import defaults from 'superagent-defaults';
import { getToken } from './utility';
import { createAxiosResponseInterceptorForClient } from './token_refresh';

// const apiVersion = 'v1';
let backendHost;

let protocol = window.location.protocol;
let NODE_ENV = process.env.REACT_APP_NODE_ENV || 'production';

if (NODE_ENV === 'production') {
  backendHost = `${protocol}//ba820287.ngrok.io/api/v1`;
} else if (NODE_ENV === 'staging') {
  backendHost = `${protocol}//ba820287.ngrok.io/api/v1`;
} else if (NODE_ENV === 'development') {
  backendHost = `${protocol}//ba820287.ngrok.io/api/v1`;
} else {
  backendHost =
    protocol + (process.env.REACT_APP_API_URL || '//ba820287.ngrok.io/api/v1');
}

console.log(NODE_ENV);
console.log(backendHost);

const API_ROOT = backendHost;

const client = axios.create({
  baseURL: API_ROOT,
});

const superagent = defaults();

const request = {
  init: () =>
    superagent.set('Authorization', `Bearer ${getToken().toJS().access_token}`),
  delete: url => request.init().delete(url),
  get: url => request.init().get(url),
  post: url => request.init().post(url),
  put: url => request.init().put(url),
};

client.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('access_token')}`;

const interceptor = createAxiosResponseInterceptorForClient(client);

interceptor();

export { request, backendHost, client };

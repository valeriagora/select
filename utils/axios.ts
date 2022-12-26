import axios from 'axios';
import { getAuthToken } from './auth';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

const httpClient = axios.create();

apiClient.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getAuthToken()}` || '';
  }
  return config;
});

function isSuccess(statusCode: number) {
  return statusCode >= 200 && statusCode <= 299;
}

export { apiClient, isSuccess, httpClient };

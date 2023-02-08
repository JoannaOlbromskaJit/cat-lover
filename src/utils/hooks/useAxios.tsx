import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { API_KEY } from '../constants';

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/'
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['x-api-key'] = API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert('You are not authorized');
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export const useAxios = makeUseAxios({
  axios: axiosInstance
});

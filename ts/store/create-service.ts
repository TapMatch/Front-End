import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {isString} from '../utils/is-string';

const instance = axios.create({
  baseURL: `${tapMatchServerUrl}api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

export const setClientAccessToken = (userToken: string) => {
  console.log('userToken: ========= ', userToken);
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (isString(userToken)) {
        // ** eslint-disable-next-line no-param-reassign
        config.headers['X-Auth-Token'] = userToken;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export default instance;

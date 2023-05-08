import axios from 'axios';

import { getToken } from './auth/auth.api';
import { BASE_URL } from './constants';

export const instance = axios.create({
  baseURL: BASE_URL || '',
});

instance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig.isRetry) {
      originalConfig.isRetry = true;

      try {
        const { token } = await getToken();

        sessionStorage.setItem('access_token', token);

        return await instance(originalConfig);
      } catch (authError) {
        sessionStorage.removeItem('access_token');
        throw authError;
      }
    }
    return Promise.reject(error);
  }
);

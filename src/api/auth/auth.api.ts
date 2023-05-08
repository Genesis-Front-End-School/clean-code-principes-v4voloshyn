import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants';
import { AUTH } from '../endpoints';

export type TokenResponse = {
  token: string;
};

export const getToken = async (): Promise<TokenResponse> => {
  try {
    const response: AxiosResponse<TokenResponse> = await axios.get(
      `${BASE_URL}${AUTH.TOKEN_ENDPOINT}`
    );

    if (!response.data) {
      throw new Error('Empty response');
    }

    if (!response.data.token) {
      throw new Error('Invalid response shape. Missing token');
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get token: ${error.message}`);
    }

    throw error;
  }
};

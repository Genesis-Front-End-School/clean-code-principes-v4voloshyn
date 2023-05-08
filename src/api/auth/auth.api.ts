import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants';
import { AUTH } from '../endpoints';

type TokenResponse = {
  token: string;
};

export const getToken = async (): Promise<TokenResponse> => {
  const response: AxiosResponse<TokenResponse> = await axios.get(
    `${BASE_URL}${AUTH.TOKEN_ENDPOINT}`
  );

  return response.data;
};

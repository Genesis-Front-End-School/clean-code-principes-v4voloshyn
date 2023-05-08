import axios, { AxiosResponse } from 'axios';

import { AUTH } from '../endpoints';
import { BASE_URL } from '../constants';

type TokenResponse = {
  token: string;
};

export const getToken = async (): Promise<TokenResponse> => {
  const response: AxiosResponse<TokenResponse> = await axios.get(
    `${BASE_URL}${AUTH.TOKEN_ENDPOINT}`
  );

  return response.data;
};

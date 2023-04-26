import { AxiosResponse } from 'axios';
import { instance } from './instance';

export const getRequest = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> => {
  const request: AxiosResponse<T> = await instance.get(endpoint, {
    params,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return request.data;
};

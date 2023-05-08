import axios, { AxiosResponse } from 'axios';
import { MockedFunction, vi } from 'vitest';

import {
  fakeResponseData,
  fakeTokenData,
} from '../../tests/__mocks__/mock-data';
import { BASE_URL } from '../constants';
import { AUTH } from '../endpoints';

import { getToken, TokenResponse } from './auth.api';

vi.mock('axios');

describe('getToken request', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const TOKEN_QUERY_URL = `${BASE_URL}${AUTH.TOKEN_ENDPOINT}`;

  it('should call the correct URL', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: fakeTokenData,
    } as AxiosResponse<TokenResponse>);

    await getToken();

    expect(axios.get).toHaveBeenCalledWith(TOKEN_QUERY_URL);
  });

  it('should return the token from the response', async () => {
    const expectedToken = fakeTokenData.token;
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: { token: expectedToken },
    } as AxiosResponse<TokenResponse>);

    const result = await getToken();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result.token).toBe(expectedToken);
  });

  it('should throw an error if the request fails', async () => {
    const expectedErrorMessage = 'Failed to get token: network error';
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(
      expectedErrorMessage
    );

    await expect(getToken()).rejects.toThrow(expectedErrorMessage);
    expect(axios.get).toHaveBeenCalledWith(TOKEN_QUERY_URL);
  });

  it('should throw an error if the response has unexpected shape', async () => {
    const expectedError = new Error(
      'Failed to get token: Invalid response shape. Missing token'
    );
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: fakeResponseData,
    } as AxiosResponse<unknown>);

    await expect(getToken()).rejects.toThrow(expectedError);
  });

  it('should throw an error if the response is empty', async () => {
    const expectedError = new Error('Failed to get token: Empty response');
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      data: null,
    } as AxiosResponse<unknown>);

    await expect(getToken()).rejects.toThrow(expectedError);
  });
});

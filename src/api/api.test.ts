import { AxiosError } from 'axios';
import { Mock, vi } from 'vitest';

import { fakeSingleCourse } from '../tests/__mocks__/mock-data';

import { CustomErrorResponse, getRequest } from './api';
import { instance } from './instance';

vi.mock('./instance');

describe('getRequest', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should make a GET request with the correct arguments and return the response data', async () => {
    const fakeEndpoint = '/courses/1';
    const fakeParams = { foo: 'bar' };
    const axiosResponse = { data: fakeSingleCourse };
    (instance.get as Mock).mockResolvedValue(axiosResponse);

    const response = await getRequest(fakeEndpoint, fakeParams);

    expect(instance.get).toHaveBeenCalledTimes(1);
    expect(instance.get).toHaveBeenCalledWith(fakeEndpoint, {
      params: fakeParams,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(response).toEqual(fakeSingleCourse);
  });

  it('should throw an error if the request fails with an Axios error', async () => {
    const fakeEndpoint = '/courses/1';
    const axiosError = {
      response: {
        data: {
          statusCode: 404,
          message: 'Not found',
        },
      },
    } as AxiosError<CustomErrorResponse>;
    (instance.get as Mock).mockRejectedValueOnce(axiosError);

    expect.assertions(1);

    try {
      await getRequest(fakeEndpoint);
    } catch (error) {
      expect(error).toEqual(axiosError);
    }
  });

  it('should throw the original error if it is not an Axios error', async () => {
    const errorMessage = 'Something went wrong';
    const error = new Error(errorMessage);

    (instance.get as Mock).mockRejectedValue(error);

    try {
      await getRequest('/test');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(error.message).toEqual(errorMessage);
    }
  });
});

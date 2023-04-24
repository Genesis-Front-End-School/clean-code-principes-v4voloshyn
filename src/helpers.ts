import axios from 'axios';

const BASE_URL = 'https://api.wisey.app/api/v1';

const getToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/anonymous`, {
      params: {
        platform: 'subscriptions',
      },
    });

    return response.data.token;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message, { cause: error.stack });
    } else {
      throw new Error(
        'Unknown error happened with getting token. Please, try to reload page'
      );
    }
  }
};

export const fetchCourses = async () => {
  try {
    const token = await getToken();

    const response = await axios.get(`${BASE_URL}/core/preview-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.courses;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message, { cause: error.stack });
    } else {
      throw new Error(
        'Unknown error happened with fetching courses. Please, try to reload page'
      );
    }
  }
};

export const fetchCourseById = async (courseId: string) => {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${BASE_URL}/core/preview-courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message, { cause: error.stack });
    } else {
      throw new Error(
        'Unknown error happened while fetchCourseById. Please, try to reload page'
      );
    }
  }
};

import axios from 'axios';

export const postRequestApi = async (path, data, options, skipRetry) => {
  try {
    const response = await axios.post(
      `${path}`,
      data,
      await getHeaders(options || {})
    );
    return response;
  } catch (error) {
    return await handleAPIError(error, options, skipRetry, () => {
      return postRequestApi(path, options, true);
    });
  }
};

export const getRequestApi = async (path, options, skipRetry) => {
  try {
    return await axios.get(
      `${path}`,
      await getHeaders(options || {})
    );
  } catch (error) {
    return await handleAPIError(error, options, skipRetry, () => {
      return getRequestApi(path, options, true);
    });
  }
};

export const deleteRequestApi = async (path, options, skipRetry) => {
  try {
    return await axios.delete(
      `${path}`,
      await getHeaders(options || {})
    );
  } catch (error) {
    return await handleAPIError(error, options, skipRetry, () => {
      return deleteRequestApi(path, options, true);
    });
  }
};

export const putRequestApi = async (path, data, options, skipRetry) => {
  try {
    return await axios.put(
      `${path}`,
      data,
      await getHeaders(options || {})
    );
  } catch (error) {
    return await handleAPIError(error, options, skipRetry, () => {
      return putRequestApi(path, data, options, true);
    });
  }
};

const getHeaders = async ({ token }) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {};
};

const handleAPIError = async (error, options, skipRetry, onRetry) => {
  if (error.response.status === 401) {
    return { error, response: error.response };
  } else {
    return error.response;
  }
};

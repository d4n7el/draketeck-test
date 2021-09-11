import { postRequestApi, getRequestApi, putRequestApi } from "./base";
import { URL_LOGIN_USER } from './consts';

export const loginApi = async (formData) => {
  const response = await postRequestApi(URL_LOGIN_USER, formData);
  return response;
};
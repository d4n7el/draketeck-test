import {
  postRequestApi,
  getRequestApi,
  putRequestApi,
  deleteRequestApi,
} from './base';
import { URL_CRUD_CRUD } from './consts';

export const create = async (formData) => {
  const response = await postRequestApi(`${URL_CRUD_CRUD}`, formData);
  return response;
};

export const read = async () => {
  const response = await getRequestApi(`${URL_CRUD_CRUD}`, {});
  return response;
};

export const deleteTask = async (id) => {
  const response = await deleteRequestApi(`${URL_CRUD_CRUD}/${id}`, {});
  return response;
};

export const update = async (id, formData) => {
  const response = await putRequestApi(`${URL_CRUD_CRUD}/${id}`, formData, {});
  return response;
};

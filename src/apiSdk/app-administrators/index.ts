import axios from 'axios';
import queryString from 'query-string';
import { AppAdministratorInterface, AppAdministratorGetQueryInterface } from 'interfaces/app-administrator';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAppAdministrators = async (
  query?: AppAdministratorGetQueryInterface,
): Promise<PaginatedInterface<AppAdministratorInterface>> => {
  const response = await axios.get('/api/app-administrators', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAppAdministrator = async (appAdministrator: AppAdministratorInterface) => {
  const response = await axios.post('/api/app-administrators', appAdministrator);
  return response.data;
};

export const updateAppAdministratorById = async (id: string, appAdministrator: AppAdministratorInterface) => {
  const response = await axios.put(`/api/app-administrators/${id}`, appAdministrator);
  return response.data;
};

export const getAppAdministratorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/app-administrators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAppAdministratorById = async (id: string) => {
  const response = await axios.delete(`/api/app-administrators/${id}`);
  return response.data;
};

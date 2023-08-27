import axios from 'axios';
import queryString from 'query-string';
import { AppDeveloperInterface, AppDeveloperGetQueryInterface } from 'interfaces/app-developer';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAppDevelopers = async (
  query?: AppDeveloperGetQueryInterface,
): Promise<PaginatedInterface<AppDeveloperInterface>> => {
  const response = await axios.get('/api/app-developers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAppDeveloper = async (appDeveloper: AppDeveloperInterface) => {
  const response = await axios.post('/api/app-developers', appDeveloper);
  return response.data;
};

export const updateAppDeveloperById = async (id: string, appDeveloper: AppDeveloperInterface) => {
  const response = await axios.put(`/api/app-developers/${id}`, appDeveloper);
  return response.data;
};

export const getAppDeveloperById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/app-developers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAppDeveloperById = async (id: string) => {
  const response = await axios.delete(`/api/app-developers/${id}`);
  return response.data;
};

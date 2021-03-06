import { IActivity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const request = {
  get: async (url: string) => await axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => request.get('/activities'),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post(`/activities`, activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/activities/${id}`),
};

export default {
  Activities,
};

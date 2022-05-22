import { AuthError, errorInstanceMaker } from '@/payload';
import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AppResponse<T> = [AxiosResponse<T>, AxiosError | null];

const getToken = () => {
  return localStorage.getItem('vite_audio_session');
};

const setToken = (token: string, reset?: true) => {
  if (reset) {
    return localStorage.removeItem('vite_audio_session');
  }

  return localStorage.setItem('vite_audio_session', token);
};

const appAxiosClient = axios.create({ baseURL: '/api/', withCredentials: true });
appAxiosClient.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
appAxiosClient.interceptors.response.use((response) => {
  if (response.config.url === '/user/signIn') {
    if (response.status === 200) {
      setToken(response.headers.authorization.split('Bearer')[1].trim());
    } else {
      setToken('', true);
    }
    window.location.replace('/');
  }
  return response;
});

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await appAxiosClient.request<T>({ ...config });
    return data;
  } catch (error) {
    throw errorInstanceMaker(error as unknown as AxiosError);
  }
};

function GET<T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): Promise<T> {
  return request<T>({ ...config, method: 'GET', url });
}

async function PUT<T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): Promise<T> {
  return request<T>({ ...config, method: 'PUT', url });
}

async function POST<T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): Promise<T> {
  return request<T>({ ...config, method: 'POST', url });
}

async function DELETE<T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): Promise<T> {
  return request<T>({ ...config, method: 'DELETE', url });
}

export interface HTTP {
  GET: typeof GET;
  PUT: typeof PUT;
  POST: typeof POST;
  DELETE: typeof DELETE;
}

export default {
  GET,
  PUT,
  POST,
  DELETE
};

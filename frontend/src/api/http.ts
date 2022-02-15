import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AppResponse<T> = [AxiosResponse<T>, AxiosError | null];

const appAxiosClient = axios.create({ baseURL: '/api/', withCredentials: true });
appAxiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await appAxiosClient.request({ ...config });
    return data;
  } catch (error) {
    const { response } = error as unknown as AxiosError;

    if (response) {
      throw { status: response.status, data: response.data };
    }

    throw error;
  }
};

function GET<T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): ReturnType<typeof request> {
  return request<T>({ ...config, method: 'GET', url });
}

async function PUT<T>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url'>
): ReturnType<typeof request> {
  return request<T>({ ...config, method: 'PUT', url });
}

async function POST<T>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url'>
): ReturnType<typeof request> {
  return request<T>({ ...config, method: 'POST', url });
}

async function DELETE<T>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url'>
): ReturnType<typeof request> {
  return request<T>({ ...config, method: 'DELETE', url });
}

export default {
  GET,
  PUT,
  POST,
  DELETE
};

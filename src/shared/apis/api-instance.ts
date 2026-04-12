import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

const DEFAULT_TIMEOUT_MS = 10_000;

export type ApiRequestConfig<TData = unknown> = AxiosRequestConfig<TData>;

type ApiMethodConfig<TData = unknown> = Omit<
  ApiRequestConfig<TData>,
  "url" | "method"
>;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async <TResponse = unknown, TData = unknown>(
  config: ApiRequestConfig<TData>,
): Promise<TResponse> => {
  const response = await axiosInstance.request<
    TResponse,
    AxiosResponse<TResponse>,
    TData
  >(config);

  return response.data;
};

const requestByMethod = <TResponse = unknown, TData = unknown>(
  method: Method,
  url: string,
  config?: ApiMethodConfig<TData>,
): Promise<TResponse> =>
  request<TResponse, TData>({
    ...config,
    method,
    url,
  });

export const apiInstance = {
  request,

  get: <TResponse = unknown, TParams = unknown>(
    url: string,
    config?: ApiMethodConfig<never> & { params?: TParams },
  ) => requestByMethod<TResponse, never>("GET", url, config),

  post: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResponse, TBody>("POST", url, { ...config, data }),

  put: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResponse, TBody>("PUT", url, { ...config, data }),

  patch: <TResponse = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResponse, TBody>("PATCH", url, { ...config, data }),

  delete: <TResponse = unknown, TBody = unknown>(
    url: string,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResponse, TBody>("DELETE", url, config),

  head: <TResponse = unknown>(
    url: string,
    config?: ApiMethodConfig<never>,
  ) => requestByMethod<TResponse, never>("HEAD", url, config),

  options: <TResponse = unknown>(
    url: string,
    config?: ApiMethodConfig<never>,
  ) => requestByMethod<TResponse, never>("OPTIONS", url, config),
};

export default apiInstance;

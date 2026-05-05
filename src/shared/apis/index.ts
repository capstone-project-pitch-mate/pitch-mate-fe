import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";

const DEFAULT_TIMEOUT_MS = 10_000;
const AUTH_BYPASS_PATHS = new Set(["/auth/login", "/auth/signup"]);

export type ApiRequestConfig<TData = unknown> = AxiosRequestConfig<TData>;
export type ApiContentType = "json" | "form-data";
export type ApiConfig<TData = unknown> = ApiRequestConfig<TData> & {
  contentType?: ApiContentType;
};
export interface ApiResponse<TResult = unknown> {
  code: number;
  status: number;
  message: string;
  result: TResult;
}

interface ApiErrorResponse {
  code?: number;
  status?: number;
  message?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  code: number;
  status: number;
  payload?: unknown;

  constructor({
    message,
    code,
    status,
    payload,
    cause,
  }: {
    message: string;
    code: number;
    status: number;
    payload?: unknown;
    cause?: unknown;
  }) {
    super(message, { cause });
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.payload = payload;
  }
}

type ApiMethodConfig<TData = unknown> = Omit<
  ApiConfig<TData>,
  "url" | "method"
>;

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (import.meta.env.PROD && !baseURL) {
  throw new Error("VITE_API_BASE_URL is required in production.");
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL ?? "",
  timeout: DEFAULT_TIMEOUT_MS,
});

const stripTrailingSlash = (path: string): string =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

const getRequestPathname = (url?: string): string => {
  if (!url) {
    return "";
  }

  try {
    return stripTrailingSlash(new URL(url, window.location.origin).pathname);
  } catch {
    return stripTrailingSlash(url.split("?")[0] ?? "");
  }
};

const shouldBypassAuth = (url?: string): boolean =>
  AUTH_BYPASS_PATHS.has(getRequestPathname(url));

axiosInstance.interceptors.request.use((config) => {
  if (shouldBypassAuth(config.url) || typeof window === "undefined") {
    return config;
  }

  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    return config;
  }

  config.headers = config.headers ?? {};
  config.headers.Authorization = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;

  return config;
});

const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    const status = data?.status ?? error.response?.status ?? 0;
    const code = data?.code ?? status;
    const message = data?.message ?? error.message;

    return new ApiError({
      message,
      code,
      status,
      payload: data,
      cause: error,
    });
  }

  if (error instanceof Error) {
    return new ApiError({
      message: error.message,
      code: 0,
      status: 0,
      payload: error,
      cause: error,
    });
  }

  return new ApiError({
    message: "Unknown error occurred.",
    code: 0,
    status: 0,
    payload: error,
  });
};

const request = async <TResult = unknown, TData = unknown>(
  config: ApiConfig<TData>,
): Promise<ApiResponse<TResult>> => {
  const { contentType = "json", headers, ...requestConfig } = config;
  const resolvedHeaders = {
    ...(headers ?? {}),
  } as Record<string, unknown>;
  const hasContentTypeHeader = Object.keys(resolvedHeaders).some(
    (key) => key.toLowerCase() === "content-type",
  );

  if (contentType === "form-data") {
    // Let the browser set multipart boundary automatically.
    delete resolvedHeaders["Content-Type"];
    delete resolvedHeaders["content-type"];
  } else if (!hasContentTypeHeader) {
    resolvedHeaders["Content-Type"] = "application/json";
  }

  try {
    const response = await axiosInstance.request<
      ApiResponse<TResult>,
      AxiosResponse<ApiResponse<TResult>>,
      TData
    >({
      ...requestConfig,
      headers: resolvedHeaders as AxiosRequestConfig<TData>["headers"],
    });

    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
};

const requestByMethod = <TResult = unknown, TData = unknown>(
  method: Method,
  url: string,
  config?: ApiMethodConfig<TData>,
): Promise<ApiResponse<TResult>> =>
  request<TResult, TData>({
    ...config,
    method,
    url,
  });

export const apiInstance = {
  request,

  get: <TResult = unknown, TParams = unknown>(
    url: string,
    config?: ApiMethodConfig<never> & { params?: TParams },
  ) => requestByMethod<TResult, never>("GET", url, config),

  post: <TResult = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResult, TBody>("POST", url, { ...config, data }),

  put: <TResult = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResult, TBody>("PUT", url, { ...config, data }),

  patch: <TResult = unknown, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResult, TBody>("PATCH", url, { ...config, data }),

  delete: <TResult = unknown, TBody = unknown>(
    url: string,
    config?: ApiMethodConfig<TBody>,
  ) => requestByMethod<TResult, TBody>("DELETE", url, config),

  head: <TResult = unknown>(url: string, config?: ApiMethodConfig<never>) =>
    requestByMethod<TResult, never>("HEAD", url, config),

  options: <TResult = unknown>(url: string, config?: ApiMethodConfig<never>) =>
    requestByMethod<TResult, never>("OPTIONS", url, config),
};

export default apiInstance;

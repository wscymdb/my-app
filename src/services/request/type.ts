import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface YMInterceptors {
  successRequestFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  failRequestFn?: (err: any) => any;
  successResponseFn?: (res: AxiosResponse) => AxiosResponse;
  failResponseFn?: (err: any) => any;
}

export interface YMInstanceInterceptors<T = AxiosResponse> {
  successRequestFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  successResponseFn?: (res: T) => T;
}

export interface YMAxiosRequestConfig<T> extends AxiosRequestConfig {
  interceptors?: T;
}

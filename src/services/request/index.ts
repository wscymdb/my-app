import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  YMAxiosRequestConfig,
  YMInterceptors,
  YMInstanceInterceptors,
} from "./type";

class YMRequest {
  instance: AxiosInstance;

  // 创建实例
  constructor(config: YMAxiosRequestConfig<YMInterceptors>) {
    this.instance = axios.create(config);

    //  全局拦截器
    this.instance.interceptors.request.use((config) => {
      // todo
      return config;
    });

    this.instance.interceptors.response.use((res) => {
      // todo
      return res.data;
    });

    // 私有拦截器(如果有的话，每个实例可以定制化拦截器)
    // axios重复添加拦截器不会被覆盖，会共同存在
    this.instance.interceptors.request.use(
      config.interceptors?.successRequestFn,
      config.interceptors?.failRequestFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.successResponseFn,
      config.interceptors?.failResponseFn
    );
  }

  // 封装网络请求方法
  request<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    // 实例 私有的拦截器
    if (config.interceptors?.successRequestFn) {
      config = config.interceptors.successRequestFn(config);
    }
    // 默认情况下Promise返回的类型是Promise<unknown> Promise方法中的类型就是unknown
    // unknown类型下任何操作都是不合法的，所以要改一些类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 实例 私有的拦截器
          if (config.interceptors?.successResponseFn) {
            res = config.interceptors.successResponseFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  //
  get<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: "GET", ...config });
  }

  post<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: "POST", ...config });
  }

  delete<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: "DELETE", ...config });
  }

  patch<T = any>(config: YMAxiosRequestConfig<YMInstanceInterceptors<T>>) {
    return this.request({ method: "PATCH", ...config });
  }
}

export default YMRequest;

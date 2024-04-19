import { message } from "antd";
import YMRequest from "./request";
import { stringify } from "qs";
// 可以用这种方式
// import { BASE_URL, TIME_OUT } from './congfig'

// 也可用环境变量中的方式

// 如果你不了解为啥 看一下这个 https://blog.csdn.net/qq_51558433/article/details/131243075?spm=1001.2014.3001.5502
// 如果服务端做了跨域处理，那么使用这个BASE_URL
// const BASE_URL = import.meta.env.VITE_BASE_URL
// 如果客户端没有做跨域 使用这个BASE_URL
const BASE_URL = "http://114.55.110.144/api/";

function getRequest(contentType: string) {
  return new YMRequest({
    baseURL: BASE_URL,
    timeout: 10000,
    interceptors: {
      successRequestFn(config) {
        // 判断contentType类型
        if (contentType === "encoded") config.data = stringify(config.data);

        return config;
      },
      failResponseFn(err) {
        const {
          response: { data },
        } = err;
        message.error(data);
      },
    },
  });
}

// contentType是 application/x-www-form-urlencoded的请求
export const request = getRequest("encoded");
// contentType是 application/json
export const requestJson = getRequest("json");

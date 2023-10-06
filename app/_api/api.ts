import axios from "axios";

const currentApiVersion = "v1";
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL + "/" + currentApiVersion;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  process.env.NEXT_PUBLIC_SELF_URL;

export const endPoints = {
  AUTH_SIGNUP: "/auth/signup",
};

// 返り値の型定義
type Response = {
  status: number;
  data: any;
};

// GETリクエスト
export const getRequest = async (url: string): Promise<Response> => {
  return axios.post(url).then((response) => {
    return {
      status: response.status,
      data: response.data,
    };
  });
};

// POSTリクエスト
export const postRequest = async (url: string, data: any): Promise<Response> => {
  return axios.post(url, data).then((response) => {
    return {
      status: response.status,
      data: response.data,
    };
  });
};
import axios from "axios";

const instance = axios.create({
  baseURL: "https://assessment.api.vweb.app/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const get = async (url = "", data = {}) => {
  return await instance({ method: "GET", url, data });
};

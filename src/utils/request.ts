/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 21:03:39
 * @LastEditTime: 2022-08-15 13:18:00
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\utils\request.ts
 */
import { message } from "antd";
import axios from "axios";
const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use((c) => {
  const token = localStorage.getItem("token");
  if (token) {
    c.headers = {
      ...c.headers,
      authorization: `Bearer ${token}`,
    };
  }
  return c;
});
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (e) => {
    if (e.response.status === 401) {
      window.logout();
    }
    message.error(e.message);
    return Promise.reject(e);
  }
);
export default request;

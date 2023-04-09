/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 20:46:20
 * @LastEditTime: 2022-06-28 21:36:48
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\react-app-env.d.ts
 */
/// <reference types="react-scripts" />
declare global {
  interface ResponseSuccess<T = {}> {
    success: boolean;
    errorMessage?: string;
    data: T;
  }
  interface IPagination<T> {
    success: boolean;
    errorMessage?: string;
    data: {
      list: T[];
      current: 1;
      pageSize: number;
      total: number;
      totalPage: number;
    };
  }
  interface Window {
    logout(): void;
  }
}
export {};

import axios from "axios";

export const getToken = () => window.localStorage.CHAT_TOKEN;
export const setToken = (token: string) => window.localStorage.CHAT_TOKEN = token;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  responseType: "json",
  headers: {
    Authorization: getToken()
  }
});

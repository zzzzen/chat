import axios, {AxiosError} from "axios";

const base = process.env.REACT_APP_API;
const TOKEN_NAME = "TOKEN_NAME";

const api = {
  get: (url: string, options = getConfig()) => axios.get(url, options).catch(errorHandler),
  post: (url: string, data: any, options = getConfig()) => axios.post(url, data, options).catch(errorHandler),
  patch: (url: string, data: any, options = getConfig()) => axios.patch(url, data, options).catch(errorHandler),
  put: (url: string, data: any, options = getConfig()) => axios.put(url, data, options).catch(errorHandler),
  delete: (url: string, options = getConfig()) => axios.delete(url, options).catch(errorHandler)
};

function errorHandler(error: AxiosError) {
  const status = error.response ? error.response.status : null;
  switch (status) {
  case 401: {
    if (window.localStorage[TOKEN_NAME]) logOutApi();
  } break;
  }
  throw error;
}

function getConfig() {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage[TOKEN_NAME]}`
    }
  };
}

export function logOutApi() {
  window.localStorage[TOKEN_NAME] = "";
  window.location.reload();
}

export function getUserApi() {
  return api.get(`${base}/account`);
}

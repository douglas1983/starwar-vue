import axios from "axios";
import {
  config,
  //   handleRequestSuccess,
  //   handleResponseSuccess,
  // token,
  errorHandler,
} from "./config";

export const http = axios.create({
  baseURL: "https://swapi-fastprp.herokuapp.com",
  ...config,
});

export const BasicAuth = {
  "Content-Type": "multipart/form-data",
  auth: {
    username: "at2d",
    password: "at2d",
  },
};

// http.interceptors.request.use(request => {
//   handleRequestSuccess(request)
//   return request
// })

http.interceptors.response.use(
  (response) => {
    // handleResponseSuccess(response)
    return response;
  },
  function handleError(error) {
    errorHandler(error);

    return Promise.reject(error.response);
  }
);

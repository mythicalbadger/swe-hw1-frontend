import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (statusCode) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "../constants";

import { toast } from "react-toastify";

const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1/",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('An error occurred.');
    }
    return Promise.reject(err);
  }
);

export default request;

import axios from "axios";


console.log(process.env.REACT_APP_BASE_URL)
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL ?? `http://localhost:4000`}/api/v1`,
});

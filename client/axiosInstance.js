import axios from "axios";

export const EmployeeBaseUrl = axios.create({
  baseURL: "http://localhost:8000/Employee",
});

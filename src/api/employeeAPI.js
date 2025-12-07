import axiosClient from "./axiosClient";

const employeeAPI = {
  getAll: () => axiosClient.get("/employees"),
  get: (id) => axiosClient.get(`/employees/${id}`),
  create: (data) => axiosClient.post("/employees", data),
  update: (id, data) => axiosClient.put(`/employees/${id}`, data),
  delete: (id) => axiosClient.delete(`/employees/${id}`),
};

export default employeeAPI;

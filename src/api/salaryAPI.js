import axiosClient from "./axiosClient";

const salaryAPI = {
  getAll: () => axiosClient.get("/salaries"),
  get: (id) => axiosClient.get(`/salaries/${id}`),
  create: (data) => axiosClient.post("/salaries", data),
  update: (id, data) => axiosClient.put(`/salaries/${id}`, data),
  delete: (id) => axiosClient.delete(`/salaries/${id}`),
};

export default salaryAPI;

import axiosClient from "./axiosClient";

const payrollAPI = {
  getAll: () => axiosClient.get("/payrolls"),
  get: (id) => axiosClient.get(`/payrolls/${id}`),
  create: (data) => axiosClient.post("/payrolls", data),
  update: (id, data) => axiosClient.put(`/payrolls/${id}`, data),
  delete: (id) => axiosClient.delete(`/payrolls/${id}`),
};

export default payrollAPI;

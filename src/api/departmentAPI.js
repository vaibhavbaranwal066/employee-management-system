import axiosClient from "./axiosClient";

const departmentAPI = {
  getAll: () => axiosClient.get("/jobs"),
  create: (data) => axiosClient.post("/jobs", data),
  update: (id, data) => axiosClient.put(`/jobs/${id}`, data),
  delete: (id) => axiosClient.delete(`/jobs/${id}`),
};

export default departmentAPI;

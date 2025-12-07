import axiosClient from "./axiosClient";

const leaveAPI = {
  getAll: () => axiosClient.get("/leaves"),
  create: (data) => axiosClient.post("/leaves", data),
  update: (id, data) => axiosClient.put(`/leaves/${id}`, data),
  delete: (id) => axiosClient.delete(`/leaves/${id}`),
};

export default leaveAPI;

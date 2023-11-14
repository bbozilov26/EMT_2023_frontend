import axios from "../../../../axios/axios";

const baseUrl = "http://localhost:9093/daily-check-ins";

const DailyCheckInRepository = {
  findAll: () => {
    return axios.get(`/all`, {
      baseURL: baseUrl,
    });
  },

  findById: (id) => {
    return axios.get(`/${id}`, {
      baseURL: baseUrl,
    });
  },

  create: (dto) => {
    return axios.post(`/create`, dto, {
      baseURL: baseUrl,
    });
  },

  update: (id, dto) => {
    return axios.put(`/update/${id}`, dto, {
      baseURL: baseUrl,
    });
  },

  delete: (id) => {
    return axios.delete(`/delete/${id}`, {
      baseURL: baseUrl,
    });
  },
};

export default DailyCheckInRepository;

import axios from "../../../../axios/axios";

const baseUrl = "http://localhost:9092/";
const usersBaseUrl = "http://localhost:9092/users";

const UserRepository = {
  login: (dto) => {
    return axios.post(`/sign-in`, dto, {
      baseURL: baseUrl,
    });
  },

  logout: () => {
    return axios.get(`/sign-out`, {
      baseURL: baseUrl,
    });
  },

  register: (dto) => {
    return axios.post(`/register`, dto, {
      baseURL: baseUrl,
    });
  },

  findAll: () => {
    return axios.get(`/all`, {
      baseURL: usersBaseUrl,
    });
  },

  findById: (id) => {
    return axios.get(`/${id}`, {
      baseURL: usersBaseUrl,
    });
  },

  create: (dto) => {
    return axios.post(`/create`, dto, {
      baseURL: usersBaseUrl,
    });
  },

  update: (id, dto) => {
    return axios.post(`/update/${id}`, dto, {
      baseURL: usersBaseUrl,
    });
  },

  delete: (id) => {
    return axios.delete(`/delete/${id}`, {
      baseURL: usersBaseUrl,
    });
  },

  claimDailyCheckIn: (dto) => {
    return axios.post(`/claim-daily-check-in`, dto, {
      baseURL: usersBaseUrl,
    });
  },
};

export default UserRepository;

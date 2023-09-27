import axios from "../../../../axios/axios";

const baseUrl = "http://localhost:9091/quiz-questions";

const QuizRepository = {
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
    return axios.post(`/update/${id}`, dto, {
      baseURL: baseUrl,
    });
  },

  delete: (id) => {
    return axios.delete(`/delete/${id}`, {
      baseURL: baseUrl,
    });
  },
};

export default QuizRepository;

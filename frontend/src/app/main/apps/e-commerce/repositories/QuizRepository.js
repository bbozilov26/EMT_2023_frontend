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

  getRandomQuestion: () => {
    return axios.get(`/random-question`, {
      baseURL: baseUrl,
    })
  },

  getAllAnswersByQuestionId: (id) => {
    return axios.get(`/${id}/get-all-answers`, {
      baseURL: baseUrl,
    })
  },

  submitAnswer: (dto) => {
    return axios.post(`/submit-answer`, dto, {
      baseURL: baseUrl,
    })
  }
};

export default QuizRepository;

import axios from "../../../../axios/axios";

const ProductRepository = {
  findAll: () => {
    return axios.get(`/products/all`, {
      baseURL: "http://localhost:9090/",
    });
  },

  findById: (id) => {
    return axios.get(`/products/${id}`, {
      baseURL: "http://localhost:9090/",
    });
  },

  create: (dto) => {
    return axios.post(`/products/create`, dto, {
      baseURL: "http://localhost:9090/",
    });
  },

  update: (id, dto) => {
    return axios.post(`/products/update/${id}`, dto, {
      baseURL: "http://localhost:9090/",
    });
  },

  delete: (id) => {
    return axios.delete(`/products/delete/${id}`, {
      baseURL: "http://localhost:9090/",
    });
  },
};

export default ProductRepository;

import axios from "../../../../axios/axios";

const ordersBaseUrl = "http://localhost:9094/orders";
const orderedProductsBaseUrl = "http://localhost:9094/ordered-products";

const OrderRepository = {
  findAllOrdersByUser: (userId) => {
    return axios.get(`/all/${userId}`, {
      baseURL: ordersBaseUrl,
    });
  },

  findAllOrders: () => {
    return axios.get(`/all`, {
      baseURL: ordersBaseUrl,
    });
  },

  findOrderById: (id) => {
    return axios.get(`/${id}`, {
      baseURL: ordersBaseUrl,
    });
  },

  createOrder: (dto) => {
    return axios.post(`/create`, dto, {
      baseURL: ordersBaseUrl,
    });
  },

  updateOrder: (id, dto) => {
    return axios.post(`/update/${id}`, dto, {
      baseURL: ordersBaseUrl,
    });
  },

  deleteOrder: (id) => {
    return axios.delete(`/delete/${id}`, {
      baseURL: ordersBaseUrl,
    });
  },

  cancelOrConfirm: (id, dto) => {
    return axios.post(`/cancel-or-confirm/${id}`, dto, {
      baseURL: ordersBaseUrl,
    });
  },

  findAllOrderedProductsByUser: (userId) => {
    return axios.get(`/all/${userId}`, {
      baseURL: orderedProductsBaseUrl,
    });
  },

  findOrderedProductByIdAndUser: (orderedProductId, userId) => {
    return axios.get(`/${orderedProductId}/${userId}`, {
      baseURL: orderedProductsBaseUrl,
    });
  },

  addToCart: (productId, userId) => {
    return axios.get(`/add/${productId}/${userId}`, {
      baseURL: orderedProductsBaseUrl,
    });
  },

  removeFromCart: (orderedProductId, userId) => {
    return axios.delete(`/remove/${orderedProductId}/${userId}`, {
      baseURL: orderedProductsBaseUrl,
    });
  },
};

export default OrderRepository;

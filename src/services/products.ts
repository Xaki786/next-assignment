/** @format */

import axios from 'axios';

const BASE_URL = 'https://my-json-server.typicode.com/benirvingplt/products';

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

/** @format */

import { Product } from "@common/types";
import axios from "axios";

const BASE_URL = "https://my-json-server.typicode.com/benirvingplt/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

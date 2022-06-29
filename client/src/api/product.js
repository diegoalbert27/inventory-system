import axios from "axios"
import { config } from "./config"

const API = "/api/products"

export async function getProducts() {
  return await axios.get(API, config)
}

export async function getProduct(id) {
  return await axios.get(`${API}/${id}`, config)
}

export async function createProduct(product) {
  return await axios.post(API, product, config)
}

export async function updateProduct(id, newProductFields) {
  return await axios.put(`${API}/${id}`, newProductFields, config)
}

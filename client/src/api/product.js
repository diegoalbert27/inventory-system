import axios from "axios"

const API = "/api/products"

export async function getProducts() {
  return await axios.get(API)
}

export async function getProduct(id) {
  return await axios.get(`${API}/${id}`)
}

export async function createProduct(product) {
  return await axios.post(API, product)
}

export async function updateProduct(id, newProductFields) {
  return await axios.put(`${API}/${id}`, newProductFields)
}

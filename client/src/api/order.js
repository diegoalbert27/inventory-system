import axios from "axios"

const API = "/api/orders"

export async function getOrders() {
  return await axios.get(API)
}

export async function getOrder(id) {
  return await axios.get(`${API}/${id}`)
}

export async function createOrder(order) {
  return await axios.post(API, order)
}

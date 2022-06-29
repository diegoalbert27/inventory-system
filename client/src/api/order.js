import axios from "axios"
import { config } from "./config"

const API = "/api/orders"

export async function getOrders() {
  return await axios.get(API, config)
}

export async function getOrder(id) {
  return await axios.get(`${API}/${id}`, config)
}

export async function createOrder(order) {
  return await axios.post(API, order, config)
}

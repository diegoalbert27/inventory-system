import axios from "axios"
import { config } from "./config"

const API = "/api/sales"

export async function getSales() {
  return await axios.get(API, config)
}

export async function getSale(id) {
  return await axios.get(`${API}/${id}`, config)
}

export async function createSale(sale) {
  return await axios.post(API, sale, config)
}

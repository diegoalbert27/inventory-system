import axios from "axios"

const API = "/api/sales"

export async function getSales() {
  return await axios.get(API)
}

export async function getSale(id) {
  return await axios.get(`${API}/${id}`)
}

export async function createSale(sale) {
  return await axios.post(API, sale)
}

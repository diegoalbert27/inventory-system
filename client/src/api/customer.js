import axios from "axios"
import { config } from "./config"
const API = "/api/customer"

export async function getCustomers() {
  return await axios.get(API, config)
}

export async function getCustomer(id) {
  return await axios.get(`${API}/${id}`, config)
}

export async function createCustomer(customer) {
  return await axios.post(API, customer, config)
}

export async function updateCustomer(id, newCustomerFields) {
  return await axios.put(`${API}/${id}`, newCustomerFields, config)
}

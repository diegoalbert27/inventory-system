import axios from "axios"

const API = "/api/customer"

export async function getCustomers() {
  return await axios.get(API)
}

export async function getCustomer(id) {
  return await axios.get(`${API}/${id}`)
}

export async function createCustomer(customer) {
  return await axios.post(API, customer)
}

export async function updateCustomer(id, newCustomerFields) {
  return await axios.put(`${API}/${id}`, newCustomerFields)
}

import axios from "axios"

const API = "/api/provider"

export async function getProviders() {
  return await axios.get(API)
}

export async function getProvider(id) {
  return await axios.get(`${API}/${id}`)
}

export async function createProvider(provider) {
  return await axios.post(API, provider)
}

export async function updateProvider(id, newProviderFields) {
  return await axios.put(`${API}/${id}`, newProviderFields)
}

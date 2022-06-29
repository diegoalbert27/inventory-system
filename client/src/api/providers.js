import axios from "axios"
import { config } from "./config"

const API = "/api/provider"

export async function getProviders() {
  return await axios.get(API, config)
}

export async function getProvider(id) {
  return await axios.get(`${API}/${id}`, config)
}

export async function createProvider(provider) {
  return await axios.post(API, provider, config)
}

export async function updateProvider(id, newProviderFields) {
  return await axios.put(`${API}/${id}`, newProviderFields, config)
}

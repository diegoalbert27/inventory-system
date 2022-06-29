import axios from "axios"
import { config } from "./config"

const API = "/api/category"

export async function getCategories() {
  return await axios.get(API, config)
}

export async function createCategory(category) {
  return await axios.post(API, category, config)
}

export async function updateCategory(id, newCategoryFields) {
  return await axios.put(`${API}/${id}`, newCategoryFields, config)
}

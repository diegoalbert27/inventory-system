import axios from "axios"

const API = "/api/category"

export async function getCategories() {
  return await axios.get(API)
}

export async function createCategory(category) {
  return await axios.post(API, category)
}

export async function updateCategory(id, newCategoryFields) {
  return await axios.put(`${API}/${id}`, newCategoryFields)
}

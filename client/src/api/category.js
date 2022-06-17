import axios from "axios"

const API = "/api/category"

export async function getCategories() {
  return await axios.get(API)
}

import axios from "axios"
const API = "/api/account"

export async function loginAccess(user) {
  const { data } = await axios.post(API, user)
  return data
}

let user = window.localStorage.getItem('loggedInventorySystem')
let token = user ? `Bearer ${JSON.parse(user).token}` : null

export const config = {
  headers: {
    Authorization: token
  }
}

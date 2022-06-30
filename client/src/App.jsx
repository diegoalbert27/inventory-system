import React, { useState, useEffect } from "react"
import { loginAccess } from "./api/account"
import { Login } from "./pages"
import { Wrapper } from "./pages/Wrapper"
import toast, { Toaster } from "react-hot-toast"
import { config } from "./api/config"
import { useNavigate } from "react-router-dom"

export function App() {
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const loginValidate = async ({ username, password }) => {
    try {
      const user = await loginAccess({ username, password })

      window.localStorage.setItem("loggedInventorySystem", JSON.stringify(user))
      
      config.headers.Authorization = `Bearer ${user.token}`
      
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      toast.error('El usuario o contraseña son invalidos')
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInventorySystem')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedInventorySystem')
    config.headers.Authorization = null
    navigate('/')
    setUser(null)
  }

  return (
    <>
      {user ? (
        <Wrapper logOut={logOut} />
      ) : (
        <div>
          <Toaster />
          <Login
            username={username}
            password={password}
            changeUsername={setUsername}
            changePassword={setPassword}
            loginValidate={loginValidate}
          />
        </div>
      )}
    </>
  )
}

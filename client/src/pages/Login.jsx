import React from "react"
import { FaEnvelope, FaLock } from "react-icons/fa"


export function Login({
  username,
  password,
  changeUsername,
  changePassword,
  loginValidate,
}) {
  const handleLogin = (e) => {
    e.preventDefault()
    loginValidate({ username, password })
  }

  return (
    <div className="bg-light wrapper">
      <div className="d-flex justify-content-center p-5">
        <div className="mt-5">
          <div className="text-center p-2">
            <h2 className="text-muted">
              <b>Sistema</b>Inventario
            </h2>
          </div>
          <div className="card p-3 rounded-0 shadow-lg border-0">
            <div className="card-body">
              <p className="card-text text-muted">
                Formulario para acceder al sistema
              </p>

              <form className="mt-4" onSubmit={handleLogin}>
                <div className="input-group mb-3">
                  <input
                    className="form-control border-end-0"
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={({ target }) => changeUsername(target.value)}
                  />
                  <div className="input-group-text text-muted bg-transparent border-start-0">
                    <FaEnvelope />
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control border-end-0"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={({ target }) => changePassword(target.value)}
                  />
                  <div className="input-group-text text-muted bg-transparent border-start-0">
                    <FaLock />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Acceder</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

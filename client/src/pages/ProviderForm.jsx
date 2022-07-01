import React, { useState } from "react"
import { FaTruck } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { createProvider } from "../api/providers"

export function ProviderForm() {
  const [provider, setProvider] = useState({
    name: "",
    rif: "",
    phone: "",
    address: "",
  })
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    provider[e.target.name] = e.target.value
    setProvider(provider)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fieldEmpty = Object.values(provider).filter((field) => field === "").length
    
    const isValid = fieldEmpty > 0 ? false : true

    const createData = async () => {
      await createProvider(provider)
      navigate('/providers', { state: true })
    }

    isValid ? createData() : toast.error('Los campos son requeridos')
  }

  return (
    <div className="p-3">
      <h2>
        <FaTruck /> Agregar nuevo proveedor
      </h2>
      <div className="card mb-3">
        <div className="card-body">
          <Toaster />
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">R.I.F</label>
              <input
                type="text"
                className="form-control"
                name="rif"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="col-8">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

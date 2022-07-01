import React, { useState } from "react"
import { FaUsers } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { createCustomer } from "../api/customer"

export function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: "",
    cedula: "",
    phone: "",
    email: "",
    address: "",
  })
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    customer[e.target.name] = e.target.value
    setCustomer(customer)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fieldEmpty = Object.values(customer).filter((field) => field === "").length
    
    const isValid = fieldEmpty > 0 ? false : true

    const createData = async () => {
      await createCustomer(customer)
      navigate('/customers', { state: true })
    }

    isValid ? createData() : toast.error('Los campos son requeridos')
  }

  return (
    <div className="p-3">
      <h2>
        <FaUsers /> Agregar nuevo cliente
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
              <label className="form-label">C.I</label>
              <input
                type="text"
                className="form-control"
                name="cedula"
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
            <div className="col-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
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

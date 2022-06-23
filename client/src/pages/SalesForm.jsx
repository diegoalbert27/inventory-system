import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaShoppingCart } from 'react-icons/fa'
import { getCustomers } from '../api/customer'

export function SalesForm() {
  const [customers, setCustomers] = useState([])
  
  useEffect(() => {
    (async () => {
      const { data } = await getCustomers()
      setCustomers(data.customers)
    })()
  }, [])
  

  const handleSubmit = (e) => {}
  const handleChange = (e) => {}

  return (
    <div>
      <h2>
        <FaShoppingCart /> Agregar nuevo venta
      </h2>
      <div className="card mb-3">
        <div className="card-body">
          <Toaster />
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Producto</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Precio</label>
              <input
                type="text"
                className="form-control"
                name="price"
                onChange={handleChange}
              />
            </div>
            
            <div className="col">
              <label className="form-label">Cliente</label>
              <select
                className="form-control"
                name="customer"
                onChange={handleChange}
                >
                {customers.map(customer => <option value={customer.id} key={customer.id}>{customer.name}</option>)}
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Realizar Venta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

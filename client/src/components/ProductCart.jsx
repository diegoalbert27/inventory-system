import React from "react"
import { FaMinus } from "react-icons/fa"

export function ProductCart({ product, removeProduct, handleAmount, sumAmount }) {
  const handleRemove = () => {
    removeProduct(product.id)
  }

  const handleChange = (e) => {
    const { value } = e.target
    
    if (Number(value)) {
      handleAmount(product, Number(value))
      sumAmount(product, Number(value))
    }
  }

  return (
    <div className="col-md-12 row">
      <div className="col-md-6">
        <label className="form-label">Producto</label>
        <input
          type="text"
          className="form-control mb-2"
          disabled
          readOnly
          value={product.name}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Cantidad</label>
        <input
          type="text"
          className="form-control"
          value={product.amount}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2 p-2">
        <button type="button" className="btn btn-danger mt-4" onClick={handleRemove}>
          <FaMinus />
        </button>
      </div>
    </div>
  )
}

import React from "react"
import { FaMinus } from "react-icons/fa"

export function ProductCart({ product, removeProduct }) {
  const handleRemove = () => {
    removeProduct(product.id)
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
          defaultValue={product.name}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Cantidad</label>
        <input
          type="text"
          className="form-control"
          defaultValue={"0"}
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

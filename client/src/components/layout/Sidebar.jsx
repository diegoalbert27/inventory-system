import React from "react"
import { FaArrowLeft, FaUsers, FaShoppingBasket, FaShoppingCart, FaStoreAlt, FaTruck } from "react-icons/fa"
import { Link } from "react-router-dom"

export function Sidebar() {
  return (
    <nav className="col-md-3 h-100 bg-white border">
      <div className="d-flex flex-row-reverse border-bottom">
        <div className="p-3">
          <span className="mr-3 h3 text-secondary">
            <FaArrowLeft />
          </span>
        </div>
      </div>

      <div className="d-flex flex-column border-bottom">
        <div className="d-flex link-container p-3">
          <Link className="outline-0" to="/customers">
            <span className="me-5 fs-5 text-secondary">
              <FaUsers />
            </span>
            <span className="fs-5 text-secondary">Clientes</span>
          </Link>
        </div>
        <div className="d-flex link-container p-3">
          <Link className="outline-0" to="/providers">
            <span className="me-5 fs-5 text-secondary">
              <FaTruck />
            </span>
            <span className="fs-5 text-secondary">Proveedores</span>
          </Link>
        </div>
        <div className="d-flex link-container p-3">
          <Link className="outline-0" to="/products">
            <span className="me-5 fs-5 text-secondary">
              <FaStoreAlt />
            </span>
            <span className="fs-5 text-secondary">Productos</span>
          </Link>
        </div>
        <div className="d-flex link-container p-3">
          <Link className="outline-0" to="/sales">
            <span className="me-5 fs-5 text-secondary">
              <FaShoppingCart />
            </span>
            <span className="fs-5 text-secondary">Ventas</span>
          </Link>
        </div>
        <div className="d-flex link-container p-3">
          <Link className="outline-0" to="/orders">
            <span className="me-5 fs-5 text-secondary">
              <FaShoppingBasket />
            </span>
            <span className="fs-5 text-secondary">Ordenes</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

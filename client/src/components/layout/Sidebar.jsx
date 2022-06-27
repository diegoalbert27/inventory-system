import React from "react"
import { FaArrowLeft, FaUsers, FaShoppingBasket, FaShoppingCart, FaStoreAlt, FaTruck, FaListAlt } from "react-icons/fa"
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
        <Link className="outline-0" to="/customers">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaUsers />
            </span>
            <span className="fs-5 text-secondary">Clientes</span>
          </div>
        </Link>
        <Link className="outline-0" to="/providers">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaTruck />
            </span>
            <span className="fs-5 text-secondary">Proveedores</span>
          </div>
        </Link>
        <Link className="outline-0" to="/products">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaStoreAlt />
            </span>
            <span className="fs-5 text-secondary">Productos</span>
          </div>
        </Link>
        <Link className="outline-0" to="/sales">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaShoppingCart />
            </span>
            <span className="fs-5 text-secondary">Ventas</span>
          </div>
        </Link>
        <Link className="outline-0" to="/orders">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaShoppingBasket />
            </span>
            <span className="fs-5 text-secondary">Ordenes</span>
          </div>
        </Link>
        <Link className="outline-0" to="/categories">
          <div className="d-flex link-container p-3">
            <span className="me-5 fs-5 text-secondary">
              <FaListAlt />
            </span>
            <span className="fs-5 text-secondary">Categorias</span>
          </div>
        </Link>
      </div>
    </nav>
  )
}

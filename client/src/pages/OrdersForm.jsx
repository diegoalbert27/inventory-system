import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaShoppingBasket, FaPlusCircle, FaMinus } from "react-icons/fa"
import { createOrder } from "../api/order"
import { getProducts } from "../api/product"
import { getProviders } from "../api/providers"
import { ProductCart } from "../components/ProductCart"

export function OrdersForm() {
  const [providers, setProviders] = useState([])
  const [products, setProducts] = useState([])

  const [product, setProduct] = useState({})
  const [provider, setProvider] = useState()

  const [orderProducts, setOrderProducts] = useState([])

  const [monto, setMonto] = useState(0)

  useEffect(() => {
    ;(async () => {
      const providers = await getProviders()
      const products = await getProducts()

      setProviders(providers.data.providers)
      setProducts(products.data.products)

      const newProduct = products.data.products[0]

      setProduct({ ...newProduct })
      setProvider(providers.data.providers[0].id)
    })()
  }, [])

  const handleSubmit = (e) => {}

  const filterProducts = products.filter(
    (product) => product.provider.id === Number(provider)
  )

  const handleChange = (e) => {
    const { value } = e.target
    setProvider(Number(value))
    const newProducts = products.filter(
      (product) => product.provider.id === Number(value)
    )
    const newProduct = newProducts.shift()
    setProduct(newProduct)
  }

  const handleChangeProduct = (e) => {
    const { value } = e.target
    const newProduct = products.find((product) => product.id === Number(value))
    setProduct({ ...newProduct })
  }

  const addProduct = () => {
    const newProducts = products.filter((p) => p.id !== product.id)
    setProducts(newProducts)
    setOrderProducts((order) => [...order, product])
    const newProduct = newProducts[0]
    setProduct(newProduct)
  }

  const removeProduct = (id) => {
    const filterProducts = orderProducts.filter((product) => product.id !== id)
    const newProduct = orderProducts.find((product) => product.id === id)
    setProducts((product) => [...product, newProduct])
    setOrderProducts(filterProducts)
  }

  return (
    <div>
      <h2>
        <FaShoppingBasket /> Agregar nuevo orden
      </h2>

      <div className="card mb-3">
        <div className="card-body">
          <Toaster />

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label className="form-label">Proveedor</label>
              <select
                type="text"
                className="form-control"
                name="provider"
                onChange={handleChange}
                value={provider}
              >
                {providers.map((provider) => (
                  <option value={provider.id} key={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Elegir Producto</label>
              <select
                type="text"
                className="form-control"
                name="product"
                onChange={handleChangeProduct}
              >
                {filterProducts.length > 0 ? (
                  filterProducts.map((product) => (
                    <option value={product.id} key={product.id}>
                      {product.name}
                    </option>
                  ))
                ) : (
                  <option value="">Sin Productos</option>
                )}
              </select>
            </div>
            <div className="col-md-2 p-2">
              {filterProducts.length > 0 ? (
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={addProduct}
                >
                  <FaPlusCircle />
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-12 row">
              {orderProducts.map((product) => (
                <ProductCart
                  key={product.id}
                  product={product}
                  removeProduct={removeProduct}
                />
              ))}
            </div>
            <div className="col-md-4">
              <label className="form-label">Monto</label>
              <input
                type="text"
                className="form-control"
                name="price"
                disabled
                readOnly
                defaultValue={monto}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Realizar Orden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaShoppingBasket, FaPlusCircle } from "react-icons/fa"
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

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const dataProviders = await getProviders()
      const dataProducts = await getProducts()

      const providers = dataProviders.data.providers.filter(provider => provider.actived !== 0)
      const products = dataProducts.data.products.filter(product => product.actived !== 0)

      setProviders(providers)
      setProducts(products)

      const provider = providers[0].id

      const newProducts = products.filter(product => product.provider.id === provider)
      const newProduct = newProducts[0]
      
      setProduct({ ...newProduct, amount: 1 })
      setProvider(provider)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isNaN(provider)) {
      toast.error('Debe de elegir un proveedor')
      return
    }

    if (orderProducts.length <= 0) {
      toast.error('Debe de elegir los productos a ordenar')
      return
    }

    const order = {
      products: orderProducts,
      provider
    }

    await createOrder(order)
    navigate('/orders', { state: true })
  }

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
    setProduct({ ...newProduct, amount: 1 })
    setProducts(products.concat(orderProducts))
    setOrderProducts([])
    setMonto(0)
  }

  const handleChangeProduct = (e) => {
    const { value } = e.target
    const newProduct = products.find((product) => product.id === Number(value))
    setProduct({ ...newProduct, amount: 1 })
  }

  const addProduct = () => {
    const newProducts = products.filter((p) => p.id !== product.id)
    setProducts(newProducts)
    setOrderProducts((order) => [...order, product])
    const newProduct = newProducts[0]
    setProduct({ ...newProduct, amount: 1 })
    setMonto(monto => product.price + monto)
  }

  const removeProduct = (id) => {
    const filterProducts = orderProducts.filter((product) => product.id !== id)
    const newProduct = orderProducts.find((product) => product.id === id)
    setProducts((product) => [...product, newProduct])
    const newProducts = products.filter(p => p.provider.id === provider).concat(newProduct)
    setProduct(newProducts[0])
    setOrderProducts(filterProducts)
    const total = monto >= newProduct.price ? monto - newProduct.price : newProduct.price
    setMonto(total)
  }

  const handleAmount = (product, amount) => {
    const newProduct = { ...product }
    newProduct.amount = amount
    orderProducts[orderProducts.indexOf(product)] = newProduct
    const newOrderProducts = [...orderProducts]
    setOrderProducts(newOrderProducts)
  }

  const sumAmount = (product, amount) => {
    const amountPrevius = product.price * product.amount
    const amountInitial = monto >= amountPrevius ? monto - amountPrevius : amountPrevius - monto
    const amountByProduct = product.price * amount
    const total = amountInitial + amountByProduct
    setMonto(total)
  }
  
  return (
    <div className="p-3">
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
                  handleAmount={handleAmount}
                  sumAmount={sumAmount}
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
                value={monto.toFixed(2)}
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

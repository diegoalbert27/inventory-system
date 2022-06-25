import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaShoppingBasket, FaPlusCircle } from "react-icons/fa"
import { createSale } from "../api/sale"
import { getProducts } from "../api/product"
import { getCustomers } from "../api/customer"
import { ProductCart } from "../components/ProductCart"

export function SalesForm() {
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])

  const [product, setProduct] = useState({})
  const [customer, setCustomer] = useState()

  const [saleProducts, setSaleProducts] = useState([])

  const [monto, setMonto] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const customers = await getCustomers()
      const products = await getProducts()

      setCustomers(customers.data.customers)
      setProducts(products.data.products)

      const newProduct = products.data.products[0]

      setProduct({ ...newProduct, amount: 1 })
      setCustomer(customers.data.customers[0].id)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isNaN(customer)) {
      toast.error('Debe de elegir un proveedor')
      return
    }

    if (saleProducts.length <= 0) {
      toast.error('Debe de elegir los productos a ordenar')
      return
    }

    const sale = {
      products: saleProducts,
      customer
    }
    
    await createSale(sale)
    navigate('/sales', { state: true })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setCustomer(Number(value))
    setSaleProducts([])
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
    setSaleProducts((sale) => [...sale, product])
    const newProduct = newProducts[0]
    setProduct({ ...newProduct, amount: 1 })
    setMonto(monto => product.price + monto)
  }

  const removeProduct = (id) => {
    const filterProducts = saleProducts.filter((product) => product.id !== id)
    const newProduct = saleProducts.find((product) => product.id === id)
    setProducts((product) => [...product, newProduct])
    setSaleProducts(filterProducts)
    const total = monto >= newProduct.price ? monto - newProduct.price : newProduct.price
    setMonto(total)
  }

  const handleAmount = (product, amount) => {
    const newProduct = { ...product }
    newProduct.amount = amount
    saleProducts[saleProducts.indexOf(product)] = newProduct
    const newSaleProducts = [...saleProducts]
    setSaleProducts(newSaleProducts)
  }

  const sumAmount = (product, amount) => {
    const amountPrevius = product.price * product.amount
    const amountInitial = monto >= amountPrevius ? monto - amountPrevius : amountPrevius - monto
    const amountByProduct = product.price * amount
    const total = amountInitial + amountByProduct
    setMonto(total)
  }
  
  return (
    <div>
      <h2>
        <FaShoppingBasket /> Agregar nuevo venta
      </h2>

      <div className="card mb-3">
        <div className="card-body">
          <Toaster />

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label className="form-label">Cliente</label>
              <select
                type="text"
                className="form-control"
                name="customer"
                onChange={handleChange}
                value={customer}
              >
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
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
                {products.length > 0 ? (
                  products.map((product) => (
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
              {products.length > 0 ? (
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
              {saleProducts.map((product) => (
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

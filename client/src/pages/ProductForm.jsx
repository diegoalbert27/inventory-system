import React, { useState, useEffect } from "react"
import { FaStoreAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { createProduct } from "../api/product"
import { getProviders } from "../api/providers"
import { getCategories } from "../api/category";

export function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: {},
    description: "",
    price: "",
    provider: "",
  })

  const [stock, setStock] = useState({
    initial: 0,
    minimo: 0
  })

  const [providers, setProviders] = useState([])
  const [categories, setCategories] = useState([])
  
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const dataProviders = await getProviders()
      const dataCategories = await getCategories()
      
      const categories = dataCategories.data.categories.filter(category => category.actived !== 0)
      const providers = dataProviders.data.providers.filter(provider => provider.actived !== 0)
      
      setProviders(providers)
      setCategories(categories)

      const newProduct = {
        ...product,
        category: categories[0].codigo,
        provider: providers[0].rif
      }
      
      setProduct(newProduct)
    })()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(product => ({ ...product, [name]: value }))
  }

  const handleChangeStock = (e) => {
    stock[e.target.name] = e.target.value
    setStock(stock)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fieldEmpty = Object.values(product).filter((field) => field === "").length
    const fieldEmptyStock = Object.values(stock).filter((field) => field === "").length
    
    const isValid = fieldEmpty > 0 ? false : true
    const isValidStock = fieldEmptyStock > 0 ? false : true

    const createData = async () => {
      product.stock = stock
      await createProduct(product)
      navigate('/products', { state: true })
    }
    
    product.stock = stock

    isValid && isValidStock ? createData() : toast.error('Los campos son requeridos')
  }

  return (
    <div>
      <h2>
        <FaStoreAlt /> Agregar nuevo producto
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
            <div className="col-md-6">
              <label className="form-label">Categoria</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
                value={product.category}
              >
                {categories.map(category => <option value={category.codigo} key={category.id}>{category.name}</option>)}
              </select>
            </div>
            <div className="col-4">
              <label className="form-label">Stock</label>
              <input
                type="text"
                className="form-control"
                name="initial"
                onChange={handleChangeStock}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Stock Minimo</label>
              <input
                type="text"
                className="form-control"
                name="minimo"
                onChange={handleChangeStock}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="description"
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
              <label className="form-label">Proveedor</label>
              <select
                className="form-control"
                name="provider"
                onChange={handleChange}
                multiple={false}
                value={product.provider}
                >
                {providers.map(provider => <option value={provider.rif} key={provider.id}>{provider.name}</option>)}
              </select>
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

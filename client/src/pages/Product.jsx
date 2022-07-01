import React, { useState, useEffect } from 'react'
import { FaStoreAlt, FaPlusCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { getProducts, updateProduct } from '../api/product'
import { Table } from '../components/product/Table'
import { Spinner } from '../components/Spinner'

export function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }
  
  useEffect(() => {
    ;(async () => {
      const { data } = await getProducts()
      const products = data.products.filter(product => product.actived !== 0)
      setProducts(products)
      setLoading(true)
      notify()
    })()
  }, [])

  const removeProduct = async (id) => {
    const newProducts = products.filter(product => product.id !== id)
    const product = products.find(product => product.id === id)
    const newProduct = {
      ...product,
      category: product.category.id,
      provider: product.provider.id,
      stock: product.stock.id,
      actived: 0
    }
    await updateProduct(id, newProduct)
    setProducts(newProducts)
  }

  return (
    <section className="p-3">
      <h2 className="p-3">
        <FaStoreAlt /> Productos
      </h2>
      
      <div className="card">
        <Link className="btn btn-primary" to="/products/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Agregar nuevo Producto
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {loading ? <Table products={products} removeProduct={removeProduct} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

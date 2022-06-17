import React, { useState, useEffect } from 'react'
import { FaStoreAlt, FaPlusCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { getProducts } from '../api/product'
import { Table } from '../components/product/Table'
import { Spinner } from '../components/Spinner'

export function Product() {
  const [products, setProducts] = useState([])

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }
  
  useEffect(() => {
    ;(async () => {
      const { data } = await getProducts()
      const { products } = data
      setProducts(products)
      notify()
    })()
  }, [])

  return (
    <section>
      <h2>
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
          {products.length > 0 ? <Table products={products} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

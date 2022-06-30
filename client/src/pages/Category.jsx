import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { FaPlusCircle, FaListAlt } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { getCategories, updateCategory } from "../api/category"
import { Table } from "../components/category/Table"
import { Spinner } from "../components/Spinner"

export function Category() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getCategories()
      const categories = data.categories.filter(category => category.actived !== 0)
      setLoading(true)
      setCategories(categories)
      notify()
    })()
  }, [])

  const removeCategory = async (id) => {
    const newCategories = categories.filter(category => category.id !== id)
    const category = categories.find(category => category.id === id)
    const newCategory = {
      ...category,
      actived: 0
    }
    await updateCategory(id, newCategory)
    setCategories(newCategories)
  }

  return (
    <section>
      <h2 className="p-3">
        <FaListAlt /> Categorias
      </h2>

      <div className="card">
        <Link className="btn btn-primary" to="/categories/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Agregar nuevo categoria
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {loading ? (
            <Table
              categories={categories}
              removeCategory={removeCategory}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  )
}

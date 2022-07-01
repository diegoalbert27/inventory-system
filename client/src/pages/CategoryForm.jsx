import React, { useState } from "react"
import { FaListAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { createCategory } from "../api/category";

export function CategoryForm() {
  const [category, setCategory] = useState({
    name: "",
  })
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    category[e.target.name] = e.target.value
    setCategory(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fieldEmpty = Object.values(category).filter((field) => field === "").length
    
    const isValid = fieldEmpty > 0 ? false : true

    const createData = async () => {
      await createCategory(category)
      navigate('/categories', { state: true })
    }

    isValid ? createData() : toast.error('Los campos son requeridos')
  }

  return (
    <div className="p-3">
      <h2>
        <FaListAlt /> Agregar nueva categoria
      </h2>
      <div className="card mb-3">
        <div className="card-body">
          <Toaster />
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md">
              <label className="form-label">Nombre de categoria</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
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

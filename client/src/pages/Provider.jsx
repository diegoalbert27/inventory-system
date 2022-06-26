import React, { useState, useEffect } from "react"
import { FaTruck, FaPlusCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { getProviders, updateProvider } from "../api/providers"
import { Table } from "../components/provider/Table"
import { Spinner } from "../components/Spinner"

export function Provider() {
  const [providers, setProviders] = useState([])

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }
  
  useEffect(() => {
    ;(async () => {
      const { data } = await getProviders()
      const { providers } = data
      setProviders(providers)
      notify()
    })()
  }, [])

  const removeProvider = async (id) => {
    const newProviders = providers.filter(provider => provider.id !== id)
    const provider = providers.find(provider => provider.id === id)
    const newProvider = {
      ...provider,
      actived: 0
    }
    await updateProvider(id, newProvider)
    setProviders(newProviders)
  }

  return (
    <section>
      <h2>
        <FaTruck /> Proveedores
      </h2>
      
      <div className="card">
        <Link className="btn btn-primary" to="/providers/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Agregar nuevo proveedor
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {providers.length > 0 ? <Table providers={providers} removeProvider={removeProvider} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

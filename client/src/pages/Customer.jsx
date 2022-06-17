import React, { useState, useEffect } from 'react'
import { FaUsers, FaPlusCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { getCustomers } from '../api/customer'
import { Table } from '../components/customer/Table'
import { Spinner } from '../components/Spinner'

export function Customer() {
  const [customers, setCustomers] = useState([])

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }
  
  useEffect(() => {
    ;(async () => {
      const { data } = await getCustomers()
      const { customers } = data
      setCustomers(customers)
      notify()
    })()
  }, [])

  return (
    <section>
      <h2>
        <FaUsers /> Clientes
      </h2>
      
      <div className="card">
        <Link className="btn btn-primary" to="/customers/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Agregar nuevo cliente
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {customers.length > 0 ? <Table customers={customers} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

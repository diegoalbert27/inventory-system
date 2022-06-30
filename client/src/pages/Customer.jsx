import React, { useState, useEffect } from 'react'
import { FaUsers, FaPlusCircle } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import { getCustomers, updateCustomer } from '../api/customer'
import { Table } from '../components/customer/Table'
import { Spinner } from '../components/Spinner'

export function Customer() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  
  const notify = () => {
    if (location.state) {
      
      toast.success('Agregado Satisfactoriamente!')
    }
  }
  
  useEffect(() => {
    ;(async () => {
      const { data } = await getCustomers()
      const customers = data.customers.filter(customer => customer.actived !== 0)
      setLoading(true)
      setCustomers(customers)
      notify()
    })()
  }, [])

  const removeCustomer = async (id) => {
    const newCustomers = customers.filter(customer => customer.id !== id)
    const customer = customers.find(customer => customer.id === id)
    const newCustomer = {
      ...customer,
      actived: 0
    }
    await updateCustomer(id, newCustomer)
    setCustomers(newCustomers)
  }

  return (
    <section>
      <h2 className="p-3">
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
          {loading ? <Table customers={customers} removeCustomer={removeCustomer} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

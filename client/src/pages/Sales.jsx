import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useLocation } from "react-router-dom"
import { Spinner } from '../components/Spinner'
import { Table } from '../components/sale/Table'
import { getSales } from '../api/sale'

export function Sales() {
  const [sales, setSales] = useState([])

  const location = useLocation()

  const notify = () => {
    if (location.state) {
      toast.success('Agregado Satisfactoriamente!')
    }
  }

  useEffect(() => {
    (async () => {
      const { data } = await getSales()
      setSales(data.sales)
      notify()
    })()
  }, [])

  return (
    <section>
      <h2>
        <FaShoppingCart /> Ventas
      </h2>
      
      <div className="card">
        <Link className="btn btn-primary" to="/sales/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Realizar nueva venta
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {sales.length > 0 ? <Table sales={sales} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

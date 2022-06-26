import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaPlusCircle } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from "react-router-dom"
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

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await getSales()

      const sales = data.sales
        .map((sale) =>
          JSON.stringify({
            codigo: sale.codigo,
            customer: sale.customer,
            date_created: sale.date_created,
          })
        )
        .filter((sale, i, arr) => arr.indexOf(sale) === i)
        .map(sale => JSON.parse(sale))
      
      notify()
      setSales(sales)
    })()
  }, [])

  const viewSale = (code) => navigate(`/sales/${code}`)

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
          {sales.length > 0 ? <Table sales={sales} viewSale={viewSale} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

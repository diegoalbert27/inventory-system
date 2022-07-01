import React, { useState, useEffect } from "react"
import { FaShoppingBasket } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { getOrders } from "../api/order"
import { TableInvoice } from "../components/TableInvoice"

export function Order() {
  const [orders, setOrders] = useState([])
  const [invoice, setInvoice] = useState({
    provider: "",
    date_created: "",
  })
  const { code } = useParams()

  useEffect(() => {
    ;(async () => {
      const { data } = await getOrders()
      const newOrders = data.orders.filter((order) => order.codigo === code)
      const newInvoice = {
        ...invoice,
        provider: data.orders[0].provider,
        date_created: data.orders[0].date_created,
      }
      setInvoice(newInvoice)
      setOrders(newOrders)
    })()
  }, [])

  return (
    <section className="p-3">
      <h2>
        <FaShoppingBasket /> Orden
      </h2>

      <div className="card">
        <div className="card-header">
          Fecha: {invoice.date_created.substring(0, 10)}
        </div>
        <div className="card-body">
          <h5 className="card-title">Cliente: {invoice.provider.name}</h5>
          <TableInvoice invoices={orders} />
        </div>
      </div>
    </section>
  )
}

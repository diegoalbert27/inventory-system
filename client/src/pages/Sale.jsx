import React, { useState, useEffect } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { getSales } from "../api/sale"
import { TableInvoice } from "../components/TableInvoice"

export function Sale() {
  const [sales, setSales] = useState([])
  const [invoice, setInvoice] = useState({
    client: "",
    date_created: "",
  })

  const { code } = useParams()

  useEffect(() => {
    ;(async () => {
      const { data } = await getSales()
      const newSales = data.sales.filter((sale) => sale.codigo === code)
      const newInvoice = {
        ...invoice,
        client: data.sales[0].customer,
        date_created: data.sales[0].date_created,
      }
      setInvoice(newInvoice)
      setSales(newSales)
    })()
  }, [])

  return (
    <section className="p-3">
      <h2>
        <FaShoppingCart /> Factura de venta
      </h2>

      <div className="card">
        <div className="card-header">
          Fecha: {invoice.date_created.substring(0, 10)}
        </div>
        <div className="card-body">
          <h5 className="card-title">Cliente: {invoice.client.name}</h5>
          <TableInvoice invoices={sales} />
        </div>
      </div>
    </section>
  )
}

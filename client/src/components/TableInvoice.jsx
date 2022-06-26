import React from "react"
import { Invoice } from "./Invoice"

export function TableInvoice({ invoices }) {
  const total = invoices
    .map((invoice) => invoice.amount * invoice.price)
    .reduce((a, b) => a + b, 0)

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, i) => (<Invoice key={invoice.id} invoice={invoice} i={i} />))}
      </tbody>
      <tbody>
        <tr>
          <th colSpan={4}>Monto:</th>
          <th>{total.toFixed(2)}</th>
        </tr>
      </tbody>
    </table>
  )
}

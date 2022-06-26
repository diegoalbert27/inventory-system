import React from "react"
import { Item } from "./Item"

export function Table({ orders, viewOrder }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Factura</th>
          <th>Proveedor</th>
          <th>Fecha</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <Item key={order.codigo} order={order} i={i + 1} viewOrder={viewOrder} />
        ))}
      </tbody>
    </table>
  )
}

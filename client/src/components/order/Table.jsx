import React from "react"
import { Item } from "./Item"

export function Table({ orders }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Factura</th>
          <th>Proveedor</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <Item key={order.id} order={order} i={i + 1} />
        ))}
      </tbody>
    </table>
  )
}

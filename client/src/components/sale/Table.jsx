import React from "react"
import { Item } from "./Item"

export function Table({ sales }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Factura</th>
          <th>Cliente</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, i) => (
          <Item key={sale.id} sale={sale} i={i + 1} />
        ))}
      </tbody>
    </table>
  )
}

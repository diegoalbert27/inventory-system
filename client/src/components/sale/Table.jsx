import React from "react"
import { Item } from "./Item"

export function Table({ sales, viewSale }) {
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
          <Item key={sale.codigo} sale={sale} i={i + 1} viewSale={viewSale} />
        ))}
      </tbody>
    </table>
  )
}

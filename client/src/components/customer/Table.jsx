import React from "react"
import { Item } from "./Item"

export function Table({ customers, removeCustomer }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Proveedor</th>
          <th>RIF</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Dirección</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, i) => (
          <Item key={customer.id} customer={customer} i={i + 1} removeCustomer={removeCustomer} />
        ))}
      </tbody>
    </table>
  )
}

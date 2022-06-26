import React from "react"
import { Item } from "./Item"

export function Table({ providers, removeProvider }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Proveedor</th>
          <th>RIF</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {providers.map((provider, i) => (
          <Item key={provider.id} provider={provider} i={i + 1} removeProvider={removeProvider} />
        ))}
      </tbody>
    </table>
  )
}

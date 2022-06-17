import React from "react"
import { Item } from "./Item"

export function Table({ products }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Categoria</th>
          <th>Cant.</th>
          <th>Actual</th>
          <th>Resto</th>
          <th>Minimo</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Proveedor</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => (
          <Item key={product.id} product={product} i={i + 1} />
        ))}
      </tbody>
    </table>
  )
}

import React from "react"
import { Item } from "./Item"

export function Table({ categories, removeCategory }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Categoria</th>
          <th>Codigo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, i) => (
          <Item key={category.id} category={category} i={i + 1} removeCategory={removeCategory} />
        ))}
      </tbody>
    </table>
  )
}

import React from "react"
import { FaTrashAlt } from "react-icons/fa"

export function Item({ category, i, removeCategory }) {
  const codigo = category.codigo.substring((category.codigo.length - 4), category.codigo.length)
  
  const handleClick = () => {
    const isConfirm = window.confirm("Desea eliminiar al cliente")

    if (isConfirm) {
      removeCategory(category.id)
    }
  }

  return (
    <tr>
      <th>{i}</th>
      <td>{category.name}</td>
      <td>{codigo.toUpperCase()}</td>
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  )
}

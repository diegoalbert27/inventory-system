import React from 'react'
import { FaTrashAlt } from "react-icons/fa"

export function Item({ provider, i, removeProvider }) {
  const handleClick = () => {
    const isConfirm = window.confirm("Desea eliminiar al cliente")

    if (isConfirm) {
      removeProvider(provider.id)
    }
  }

  return (
    <tr>
      <th>{i}</th>
      <td>{provider.name}</td>
      <td>{provider.rif}</td>
      <td>{provider.phone}</td>
      <td>{provider.address}</td>
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  )
}

import React from "react"
import { FaTrashAlt } from "react-icons/fa"

export function Item({ customer, i, removeCustomer }) {
  const handleClick = () => {
    const isConfirm = window.confirm("Desea eliminiar al cliente")

    if (isConfirm) {
      removeCustomer(customer.id)
    }
  }

  return (
    <tr>
      <th>{i}</th>
      <td>{customer.name}</td>
      <td>{customer.cedula}</td>
      <td>{customer.phone}</td>
      <td>{customer.email}</td>
      <td>{customer.address}</td>
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  )
}

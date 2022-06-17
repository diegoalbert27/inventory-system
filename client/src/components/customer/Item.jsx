import React from 'react'

export function Item({ customer, i }) {
  return (
    <tr>
      <th>{i}</th>
      <td>{customer.name}</td>
      <td>{customer.cedula}</td>
      <td>{customer.phone}</td>
      <td>{customer.email}</td>
      <td>{customer.address}</td>
    </tr>
  )
}

import React from 'react'

export function Item({ order, i }) {
  
  const codigo = order.codigo.substring((order.codigo.length - 4), order.codigo.length)
  
  return (
    <tr>
      <th>{i}</th>
      <td>{codigo}</td>
      <td>{order.provider.name}</td>
      <td>{order.date_created.substring(0, 10)}</td>
    </tr>
  )
}

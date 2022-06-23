import React from 'react'

export function Item({ sale, i }) {
  
  const codigo = sale.codigo.substring((sale.codigo.length - 4), sale.codigo.length)
  
  return (
    <tr>
      <th>{i}</th>
      <td>{codigo}</td>
      <td>{sale.customer.name}</td>
      <td>{sale.date_created.substring(0, 10)}</td>
    </tr>
  )
}

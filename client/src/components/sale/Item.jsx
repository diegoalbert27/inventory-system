import React from 'react'
import { FaEye } from 'react-icons/fa'

export function Item({ sale, i, viewSale }) {
  
  const codigo = sale.codigo.substring((sale.codigo.length - 4), sale.codigo.length)

  const handleClick = () => {
    viewSale(sale.codigo)
  }
  
  return (
    <tr>
      <th>{i}</th>
      <td>{codigo.toUpperCase()}</td>
      <td>{sale.customer.name}</td>
      <td>{sale.date_created.substring(0, 10)}</td>
      <td>
        <button className='btn btn-primary' onClick={handleClick}><FaEye /></button>
      </td>
    </tr>
  )
}

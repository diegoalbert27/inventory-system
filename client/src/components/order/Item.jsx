import React from 'react'
import { FaEye } from 'react-icons/fa'

export function Item({ order, i, viewOrder }) {
  
  const codigo = order.codigo.substring((order.codigo.length - 4), order.codigo.length)

  const handleClick = () => {
    viewOrder(order.codigo)
  }
  
  return (
    <tr>
      <th>{i}</th>
      <td>{codigo.toUpperCase()}</td>
      <td>{order.provider.name}</td>
      <td>{order.date_created.substring(0, 10)}</td>
      <td>
        <button className='btn btn-primary' onClick={handleClick}><FaEye /></button>
      </td>
    </tr>
  )
}

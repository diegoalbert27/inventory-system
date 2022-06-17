import React from 'react'

export function Item({ product, i }) {
  const resto = product.stock.stock - product.stock.current_stock
  
  return (
    <tr>
      <th>{i}</th>
      <td>{product.name}</td>
      <td>{product.category.name}</td>
      <td>{product.stock.stock}</td>
      <td>{product.stock.current_stock}</td>
      <td>{resto}</td>
      <td>{product.stock.stock_min}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.provider.name}</td>
    </tr>
  )
}

import React from "react"
import { FaTrashAlt } from "react-icons/fa"

export function Item({ product, i, removeProduct }) {
  const resto = product.stock.stock - product.stock.current_stock

  const handleClick = () => {
    const isConfirm = window.confirm('Desea eliminiar el producto')

    if (isConfirm) {
      removeProduct(product.id)
    }
  }

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
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  )
}

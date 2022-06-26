import React from "react"

export function Invoice({ invoice, i }) {
  const total = ({ amount, price }) => {
    return amount * price
  }
  
  return (
    <tr>
      <th>{i + 1}</th>
      <td>{invoice.product.name}</td>
      <td>{invoice.price}</td>
      <td>{invoice.amount}</td>
      <td>{total(invoice)}</td>
    </tr>
  )
}

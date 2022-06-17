import React from 'react'

export function Item({ provider, i }) {
  return (
    <tr>
      <th>{i}</th>
      <td>{provider.name}</td>
      <td>{provider.rif}</td>
      <td>{provider.phone}</td>
      <td>{provider.address}</td>
    </tr>
  )
}

import React from "react"

export function Alert({ message, type }) {
  const alertClass = `alert alert-${type}`
  
  return (
    <div className={alertClass} role="alert">
      <strong>{message}</strong>
    </div>
  )
}

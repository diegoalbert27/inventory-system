import React from "react"
import { Link } from "react-router-dom"

export function Navbar({ brand }) {
  return (
    <nav className="navbar navbar-dark bg-primary shadow">
      <div className="container-fluid p-2">
        <Link className="navbar-brand" to="/">
          {brand}
        </Link>
      </div>
    </nav>
  )
}

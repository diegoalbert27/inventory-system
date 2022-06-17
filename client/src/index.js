import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { BrowserRouter } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import "./App.css"

const root = createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

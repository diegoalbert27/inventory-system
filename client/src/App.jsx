import React from "react"
import { Navbar } from "./components/layout/Navbar"
import { Sidebar } from "./components/layout/Sidebar"
import { HomePage, Product, ProductForm, Provider, ProviderForm, Sales, SalesForm, Orders, OrdersForm, Customer, CustomerForm } from "./pages"
import { Routes, Route  } from "react-router-dom"

export function App() {
  return (
    <div className="wrapper bg-light">
      <div className="row g-0 h-100 w-100">

        <Sidebar />

        <div className="col-md-9">
          
          <Navbar brand="Sistema de Inventario" />

          <div className="m-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="/products" element={<Product />} />
              <Route path="/products/add" element={<ProductForm />} />

              <Route path="/providers" element={<Provider />} />
              <Route path="/providers/add" element={<ProviderForm />} />

              <Route path="/customers" element={<Customer />} />
              <Route path="/customers/add" element={<CustomerForm />} />
              
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/add" element={<SalesForm />} />
              
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/add" element={<OrdersForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

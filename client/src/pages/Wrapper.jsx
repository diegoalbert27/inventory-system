import React from "react"
import { Routes, Route } from "react-router-dom"

import { Navbar } from "../components/layout/Navbar"
import { Sidebar } from "../components/layout/Sidebar"
import {
  HomePage,
  Product,
  ProductForm,
  Provider,
  ProviderForm,
  Sales,
  Sale,
  SalesForm,
  Orders,
  OrdersForm,
  Order,
  Customer,
  CustomerForm,
  Category,
  CategoryForm,
} from "./"

export function Wrapper({ logOut }) {
  return (
    <div className="row g-0">
      <Sidebar logOut={logOut} />

      <div className="position-absolute top-0 end-0 col-md-9 h-100 overflow-auto">
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
            <Route path="/sales/:code" element={<Sale />} />

            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/add" element={<OrdersForm />} />
            <Route path="/orders/:code" element={<Order />} />

            <Route path="/categories" element={<Category />} />
            <Route path="/categories/add" element={<CategoryForm />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

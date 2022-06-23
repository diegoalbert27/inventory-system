import React, { useEffect, useState } from 'react'
import { FaShoppingBasket, FaPlusCircle } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from "react-router-dom"
import { Spinner } from '../components/Spinner'
import { Table } from '../components/order/Table'
import { getOrders } from '../api/order'

export function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await getOrders()
      
      // const orders = data.orders.filter((order, i) => {
      //   if (i > 0) {
      //     return order.codigo === data.orders[i - 1].codigo
      //   }

      //   return order.codigo === data.orders[i + 1].codigo
      // })
      
      setOrders(data.orders)
    })()
  }, [])

  return (
    <section>
      <h2>
        <FaShoppingBasket /> Ordenes
      </h2>
      
      <div className="card">
        <Link className="btn btn-primary" to="/orders/add">
          <span>
            <FaPlusCircle />
          </span>{" "}
          Realizar nueva orden
        </Link>
        <div className="card-body card-table">
          <Toaster />
          {orders.length > 0 ? <Table orders={orders} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from "react"
import { FaShoppingBasket, FaPlusCircle } from "react-icons/fa"
import toast, { Toaster } from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"
import { Table } from "../components/order/Table"
import { getOrders } from "../api/order"

export function Orders() {
  const [orders, setOrders] = useState([])

  const location = useLocation()

  const notify = () => {
    if (location.state) {
      toast.success("Agregado Satisfactoriamente!")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const { data } = await getOrders()

      const orders = data.orders
        .map((order) =>
          JSON.stringify({
            codigo: order.codigo,
            provider: order.provider,
            date_created: order.date_created,
          })
        )
        .filter((order, i, arr) => arr.indexOf(order) === i)
        .map(order => JSON.parse(order))
      
      notify()
      setOrders(orders)
    })()
  }, [])

  const viewOrder = (code) => navigate(`/orders/${code}`)

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
          {orders.length > 0 ? <Table orders={orders} viewOrder={viewOrder} /> : <Spinner />}
        </div>
      </div>
    </section>
  )
}

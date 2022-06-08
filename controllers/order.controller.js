import Order from "../models/order.model.js"
import Provider from "../models/provider.model.js"
import Product from "../models/product.model.js"
import Stock from "../models/stock.model.js"
import Category from "../models/category.model.js"

import { v4 as uuidv4 } from "uuid"
import { formatDateNow } from "../utils/helpers.js"

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()

    let rawOrders = await Promise.all(
      orders.map(async (order) => {
        const provider = await Provider.findById(order.provider)
        const product = await Product.findById(order.product)

        const rawProduct = product.shift()

        const stock = await Stock.findById(rawProduct.stock)
        const category = await Category.findById(rawProduct.category)

        return {
          ...order,
          provider: provider.shift(),
          product: {
            ...rawProduct,
            stock: stock.shift(),
            category: category.shift(),
          },
        }
      })
    )

    return res.json({ orders: rawOrders })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createOrder = async (req, res) => {
  const { product, provider, amount } = req.body
  try {
    const isProduct = await Product.findById(product)
    const isProvider = await Provider.findById(provider)

    if (!isProduct)
      return res.status(404).json({ message: "Product Not Found" })
    if (!isProvider)
      return res.status(404).json({ message: "Provider Not Found" })

    const rawProduct = isProduct.shift()
    const rawProvider = isProvider.shift()

    if (rawProduct.provider !== rawProvider.id)
      return res
        .status(404)
        .json({ message: "This provider not is part for this product" })

    const stock = await Stock.findById(product)
    const rawStock = stock.shift()

    const editedStock = await Stock.findByIdAndUpdate(rawStock.id, {
      initial: rawStock.stock + amount,
      current: rawStock.stock + amount,
      minimo: rawStock.stock_min,
    })

    if (!editedStock)
      return res.status(404).json({ message: "Stock Not Found" })

    const newOrder = {
      codigo: uuidv4(),
      provider: provider,
      dateCreated: formatDateNow(),
      product: product,
      price: rawProduct.price,
      amount,
    }

    const savedOrder = await Order.save(newOrder)

    return res.json({ message: "New order added", order: savedOrder.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findById(Number(id))

    if (!order) return res.status(404).json({ message: "Order Not Found" })

    const rawOrder = order.shift()

    const provider = await Provider.findById(rawOrder.provider)
    const product = await Product.findById(rawOrder.product)

    const rawProduct = product.shift()

    const stock = await Stock.findById(rawProduct.stock)
    const category = await Category.findById(rawProduct.category)

    return res.json({
      order: {
        ...rawOrder,
        provider: provider.shift(),
        product: {
          ...rawProduct,
          stock: stock.shift(),
          category: category.shift(),
        },
      },
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

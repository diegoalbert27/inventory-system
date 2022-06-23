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
  const { products, provider } = req.body
  try {
    const isProvider = await Provider.findById(provider)
    
    if (!isProvider)
      return res.status(404).json({ message: "Provider Not Found" })
    
    const rawProvider = isProvider.shift()

    const codigo = uuidv4()
    const dateCreated = formatDateNow()

    let isCompleted = false

    const orders = await Promise.all(
      products.map(async (product, i) => {
        const isProduct = await Product.findById(product.id)
        
        if (!isProduct)
          res.status(404).json({ message: "Product Not Found" })
        
        const rawProduct = isProduct.shift()
        
        if (rawProduct.provider !== rawProvider.id)
          res
            .status(404)
            .json({ message: "This provider not is part for this product", product: product.id })
    
        const stock = await Stock.findById(product.id)
        const rawStock = stock.shift()
        
        const editedStock = await Stock.findByIdAndUpdate(rawStock.id, {
          initial: rawStock.stock + product.amount,
          current: rawStock.stock + product.amount,
          minimo: rawStock.stock_min,
        })
        
        if (!editedStock)
          res.status(404).json({ message: "Stock Not Found" })
    
        const newOrder = {
          codigo,
          provider: provider,
          dateCreated,
          product: product.id,
          price: rawProduct.price,
          amount: product.amount,
        }
        
        const savedOrder = await Order.save(newOrder)
        
        if (products.length === (i + 1)) {
          isCompleted = !isCompleted
        }

        return { order: { id: savedOrder.insertId, product: product.id } }
      })
    )

    if (isCompleted) return res.json({ message: "New order added", orders })
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

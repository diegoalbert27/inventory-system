import Sale from "../models/sale.model.js"
import Customer from "../models/customer.model.js"
import Product from "../models/product.model.js"
import Stock from "../models/stock.model.js"
import Category from "../models/category.model.js"

import { v4 as uuidv4 } from "uuid"
import { formatDateNow } from "../utils/helpers.js"

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()

    let rawSales = await Promise.all(
      sales.map(async (sale) => {
        const customer = await Customer.findById(sale.customer)
        const product = await Product.findById(sale.product)

        const rawProduct = product.shift()

        const stock = await Stock.findById(rawProduct.stock)
        const category = await Category.findById(rawProduct.category)

        return {
          ...sale,
          customer: customer.shift(),
          product: {
            ...rawProduct,
            stock: stock.shift(),
            category: category.shift(),
          },
        }
      })
    )

    return res.json({ sales: rawSales })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createSale = async (req, res) => {
  const { product, customer, amount } = req.body
  try {
    const isProduct = await Product.findById(product)
    const isCustomer = await Customer.findById(customer)

    if (!isProduct)
      return res.status(404).json({ message: "Product Not Found" })
    if (!isCustomer)
      return res.status(404).json({ message: "Customer Not Found" })

    const rawProduct = isProduct.shift()

    const stock = await Stock.findById(product)
    const rawStock = stock.shift()

    if (rawStock.current_stock <= rawStock.stock_min) {
      return res
        .status(404)
        .json({ message: "The amount product is in your min" })
    }

    const editedStock = await Stock.findByIdAndUpdate(rawStock.id, {
      initial: rawStock.stock,
      current: rawStock.current_stock - amount,
      minimo: rawStock.stock_min,
    })

    if (!editedStock)
      return res.status(404).json({ message: "Stock Not Found" })

    const newSale = {
      codigo: uuidv4(),
      customer: customer,
      dateCreated: formatDateNow(),
      product: product,
      price: rawProduct.price,
      amount,
    }

    const savedSale = await Sale.save(newSale)

    return res.json({ message: "New sale added", sale: savedSale.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getSale = async (req, res) => {
  try {
    const { id } = req.params
    const sale = await Sale.findById(Number(id))

    if (!sale) return res.status(404).json({ message: "Sale Not Found" })

    const rawSale = sale.shift()

    const customer = await Customer.findById(rawSale.customer)
    const product = await Product.findById(rawSale.product)

    const rawProduct = product.shift()

    const stock = await Stock.findById(rawProduct.stock)
    const category = await Category.findById(rawProduct.category)

    return res.json({
      sale: {
        ...rawSale,
        customer: customer.shift(),
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

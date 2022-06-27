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
  const { products, customer } = req.body
  try {
    const isCustomer = await Customer.findById(customer)

    if (!isCustomer)
      return res.status(404).json({ message: "Customer Not Found" })

    const codigo = uuidv4()
    const dateCreated = formatDateNow()
  
    let isCompleted = false

    const sales = await Promise.all(
      products.map(async (product, i) => {
        const isProduct = await Product.findById(product.id)
        
        if (!isProduct)
          return { status: false, message: "Product Not Found" }
        
        const rawProduct = isProduct.shift()
        
        const stock = await Stock.findById(rawProduct.id)
        const rawStock = stock.shift()
        
        if (rawStock.current_stock <= rawStock.stock_min) {
          return { status: false, message: "The amount product is in your min" }
        }
    
        const editedStock = await Stock.findByIdAndUpdate(rawStock.id, {
          initial: rawStock.stock,
          current: rawStock.current_stock - product.amount,
          minimo: rawStock.stock_min,
        })
    
        if (!editedStock)
          return { status: false, message: "Stock Not Found" }
    
        const newSale = {
          codigo,
          customer,
          dateCreated,
          product: product.id,
          price: rawProduct.price,
          amount: product.amount,
        }
        
        const savedSale = await Sale.save(newSale)

        if (products.length === (i + 1)) {
          isCompleted = !isCompleted
        }

        return { id: savedSale.insertId, status: true, customer }
      })
    )
    
    return isCompleted ? res.json({ message: "New sales added", sales }) : res.json({ sales })
  
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

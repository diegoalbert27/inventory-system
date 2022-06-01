import Product from "../models/product.model.js"
import Category from "../models/category.model.js"
import Stock from "../models/stock.model.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    let rawProducts = await Promise.all(
      products.map(async product => {
      const category = await Category.findById(product.category)
      const stock = await Stock.findById(product.id)
      return {...product, category: category.shift(), stock: stock.shift()}
    }))

    return res.json({ products: rawProducts })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body

  const categories = await Category.find()
  const category = categories.find(category => category.codigo === product.category) ?? false

  if (!category) return res.status(404).json({ message: 'Category product not found' })
  
  const savedStock = await Stock.save(product.stock)
  product.category = category.id
  product.stock = savedStock.insertId
  
  const savedProduct = await Product.save(product)
  return res.json({ message: 'New product added', product: savedProduct.insertId })
}

export const editProduct = () => {}
export const getProduct = () => {}

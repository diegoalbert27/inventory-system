import Product from "../models/product.model.js"
import Category from "../models/category.model.js"
import Stock from "../models/stock.model.js"
import Provider from "../models/provider.model.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    let rawProducts = await Promise.all(
      products.map(async product => {
      const category = await Category.findById(product.category)
      const provider = await Provider.findById(product.provider)
      const stock = await Stock.findById(product.id)
      return {...product, category: category.shift(), stock: stock.shift(), provider: provider.shift()}
    }))

    return res.json({ products: rawProducts })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body
  try {
    const categories = await Category.find()
    const category = categories.find(category => category.codigo === product.category) ?? false

    if (!category) return res.status(404).json({ message: 'Category product not found' })

    const providers = await Provider.find()
    const provider = providers.find(provider => provider.rif == product.provider) ?? false

    if (!provider) return res.status(404).json({ message: "Provider Not Found" })
  
    const savedStock = await Stock.save(product.stock)
    product.category = category.id
    product.stock = savedStock.insertId
  
    const savedProduct = await Product.save({...product, provider: provider.id})
    return res.json({ message: 'New product added', product: savedProduct.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editProduct = () => {}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(Number(id))
    
    if (!product) return res.status(404).json({ message: "Provider Not Found" });

    const rawProduct = product.shift()
    
    const provider = await Provider.findById(rawProduct.provider)
    const stock = await Stock.findById(rawProduct.stock)
    const category = await Category.findById(rawProduct.category)
    
    return res.json({ product: {...rawProduct, category: category.shift(), stock: stock.shift(), provider: provider.shift() } })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

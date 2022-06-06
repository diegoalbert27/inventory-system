import Provider from "../models/provider.model.js"
import Product from "../models/product.model.js"
import ProviderProduct from "../models/provider.product.model.js"
import { raw } from "mysql"

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find()
    return res.json({ providers })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createProvider = async (req, res) => {
  try {
    const { name, rif, phone, address } = req.body
    const savedProvider = await Provider.save({ name, rif, phone, address })
    return res.json({ message: 'New provider added', provider: savedProvider.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editProvider = async (req, res) => {
  const { id } = req.params
  try {
    const editProvider = await Provider.findByIdAndUpdate(Number(id), req.body)
    
    if (!editProvider) 
      return res.status(404).json({ message: "Provider Not Found" });
    
    return res.json({ message: 'Provider updating' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getProvider = async (req, res) => {
  const { id } = req.params
  try {
    const provider = await Provider.findById(Number(id))
    
    if (!provider) 
      return res.status(404).json({ message: "Provider Not Found" });
    
    return res.json({ provider: provider.shift() })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const addProducts = async (req, res) => {
  const { provider, products } = req.body

  try {
    const providers = await Provider.find()
    const providerData = providers.find(p => p.rif == provider) ?? false

    if (!providerData) {
      return res.status(404).json({ message: "Provider Not Found" })
    }

    const results = await Promise.all(
      products.map(async product => {
        const result = await Product.findById(product)
        if (!result) return res.json({ message: 'Product Not Found' })
        
        const productId = result.shift().id
        const providerProduct = await ProviderProduct.save({ provider: providerData.id, product: productId })

        return providerProduct.insertId
      })
    )

    res.json({ message: 'Products added successfully', products: results })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

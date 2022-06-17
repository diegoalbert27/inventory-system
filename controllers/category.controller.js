import Category from "../models/category.model.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    return res.json({ categories })
  } catch (error) {
    res.status(500).json({ message: error })
  }  
}
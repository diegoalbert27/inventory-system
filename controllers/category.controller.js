import Category from "../models/category.model.js"
import { v4 as uuidv4 } from "uuid"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    return res.json({ categories })
  } catch (error) {
    res.status(500).json({ message: error })
  }  
}

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    const codigo = uuidv4()
    const savedCategory = await Category.save({ name, codigo })
    return res.json({ message: 'New category added', category: savedCategory.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editCategory = async (req, res) => {
  const { id } = req.params
  try {
    const editCategory = await Category.findByIdAndUpdate(Number(id), req.body)
    
    if (!editCategory) 
      return res.status(404).json({ message: "Category Not Found" });
    
    return res.json({ message: 'Category updating' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

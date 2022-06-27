import { Router } from "express"
import { getCategories, editCategory, createCategory } from "../controllers/category.controller.js"

const router = new Router()

router.get('/', getCategories)
router.post('/', createCategory)
router.put('/:id', editCategory)

export default router

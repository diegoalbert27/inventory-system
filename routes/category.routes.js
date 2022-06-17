import { Router } from "express"
import { getCategories } from "../controllers/category.controller.js"

const router = new Router()

router.get('/', getCategories)

export default router

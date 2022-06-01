import { Router } from "express";
import { getProducts, createProduct, editProduct, getProduct } from '../controllers/products.controller.js'

const router = Router()

router.get('/', getProducts)
router.post('/', createProduct)
router.put('/:id', editProduct)
router.get('/:id', getProduct)

export default router
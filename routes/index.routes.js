import { Router } from "express";
import provider from './provider.routes.js'
import products from './products.routes.js'

const router = Router()

router.use('/api/provider', provider)
router.use('/api/products', products)

export default router

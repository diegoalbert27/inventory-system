import { Router } from "express";
import provider from './provider.routes.js'
import products from './products.routes.js'
import customer from './customer.routes.js'

const router = Router()

router.use('/api/provider', provider)
router.use('/api/products', products)
router.use('/api/customer', customer)

export default router

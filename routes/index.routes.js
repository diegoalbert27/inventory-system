import { Router } from "express";
import provider from './provider.routes.js'
import products from './products.routes.js'
import customer from './customer.routes.js'
import order from './order.routes.js'
import sale from './sale.routes.js'
import category from './category.routes.js'

const router = Router()

router.use('/api/provider', provider)
router.use('/api/products', products)
router.use('/api/customer', customer)
router.use('/api/orders', order)
router.use('/api/sales', sale)
router.use('/api/category', category)

export default router

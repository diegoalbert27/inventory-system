import { Router } from "express";
import { getProviders, createProvider, editProvider, getProvider, addProducts } from '../controllers/provider.controller.js'

const router = Router()

router.get('/', getProviders)
router.post('/', createProvider)
router.put('/:id', editProvider)
router.get('/:id', getProvider)
router.post('/products', addProducts)

export default router

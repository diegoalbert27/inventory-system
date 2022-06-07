import { Router } from "express";
import { getProviders, createProvider, editProvider, getProvider } from '../controllers/provider.controller.js'

const router = Router()

router.get('/', getProviders)
router.post('/', createProvider)
router.put('/:id', editProvider)
router.get('/:id', getProvider)

export default router

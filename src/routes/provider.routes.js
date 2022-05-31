import { Router } from "express";
import { getProviders } from '../controllers/provider.controller.js'

const router = Router()

router.get('/', getProviders)

export default router

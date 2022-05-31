import { Router } from "express";
import provider from './provider.routes.js'

const router = Router()

router.use('/api/provider', provider)

export default router

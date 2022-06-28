import { Router } from "express"
import { loginRouter } from "../controllers/account.controller.js";

const router = new Router()

router.post('/', loginRouter)

export default router

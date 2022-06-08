import { Router } from "express"
import {
  getOrders,
  getOrder,
  createOrder,
} from "../controllers/order.controller.js"

const router = Router()

router.get("/", getOrders)
router.post("/", createOrder)
router.get("/:id", getOrder)

export default router

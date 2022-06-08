import { Router } from "express"
import {
  getSales,
  getSale,
  createSale,
} from "../controllers/sale.controller.js"

const router = Router()

router.get("/", getSales)
router.post("/", createSale)
router.get("/:id", getSale)

export default router

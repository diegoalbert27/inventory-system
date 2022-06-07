import { Router } from "express";
import { getCustomers, createCustomer, editCustomer, getCustomer } from '../controllers/customer.controller.js'

const router = Router()

router.get('/', getCustomers)
router.post('/', createCustomer)
router.put('/:id', editCustomer)
router.get('/:id', getCustomer)

export default router

import { Router } from "express"
import { getUsers, getUser, editUser, createUser } from "../controllers/user.controller.js"

const router = new Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', editUser)

export default router

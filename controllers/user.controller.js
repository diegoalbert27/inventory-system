import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({ users })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "Customer Not Found" })

    return res.json({ user })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const savedUser = await User.save({
      username,
      password: passwordHash,
      email,
    })
    return res.json({ message: "New user added", user: savedUser.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editUser = async (req, res) => {
  const { id } = req.params
  try {
    const editUser = await User.findByIdAndUpdate(Number(id), req.body)

    if (!editUser) return res.status(404).json({ message: "User Not Found" })

    return res.json({ message: "User updating" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

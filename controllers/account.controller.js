import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginRouter = async (req, res) => {
  const { body } = req
  const { username, password } = body

  const users = await User.find()
  const user = users.find((user) => user.username === username)

  const passwordCorrect =
    !user ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid user or password",
    })
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  })

  res.send({
    username: user.username,
    token,
  })
}

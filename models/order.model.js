import connection from "../utils/mysql.js"

const Order = {}

Order.find = () =>
  new Promise((resolve, reject) => {
    connection.query("SELECT * FROM orders", (err, results) => {
      if (err) reject(err)

      resolve(results)
    })
  })

Order.save = ({ codigo, provider, dateCreated, product, price, amount }) =>
  new Promise((resolve, reject) => {
    const post = [codigo, provider, dateCreated, product, price, amount]
    connection.query(
      "INSERT INTO orders (codigo, provider, date_created, product, price, amount) VALUES (?, ?, ?,?, ?, ?)",
      post,
      (err, results) => {
        if (err) reject(err)

        resolve(results)
      }
    )
  })

Order.findById = (id) =>
  new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM orders WHERE id = ?",
      [id],
      (err, results) => {
        if (err) reject(err)

        if (!results.length) return resolve(false)

        resolve(results)
      }
    )
  })

export default Order

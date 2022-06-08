import connection from "../utils/mysql.js"

const Sale = {}

Sale.find = () =>
  new Promise((resolve, reject) => {
    connection.query("SELECT * FROM sales", (err, results) => {
      if (err) reject(err)

      resolve(results)
    })
  })

Sale.save = ({ codigo, customer, dateCreated, product, price, amount }) =>
  new Promise((resolve, reject) => {
    const post = [product, codigo, amount, price, customer, dateCreated]
    connection.query(
      "INSERT INTO sales (product, codigo, amount, price, customer, date_created) VALUES (?, ?, ?, ?, ?, ?)",
      post,
      (err, results) => {
        if (err) reject(err)

        resolve(results)
      }
    )
  })

Sale.findById = (id) =>
  new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM sales WHERE id = ?",
      [id],
      (err, results) => {
        if (err) reject(err)

        if (!results.length) return resolve(false)

        resolve(results)
      }
    )
  })

export default Sale

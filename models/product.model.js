import connection from "../utils/mysql.js";

const Product = {}

Product.save = ({ name, category, stock, description, actived = 1, price = 0.00 }) => new Promise((resolve, reject) => {
  const post = [name, category, stock, description, actived, price]
  connection.query('INSERT INTO product (name, category, stock, description, actived, price) VALUES (?, ?, ?, ?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Product.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM product', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

export default Product
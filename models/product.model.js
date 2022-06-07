import connection from "../utils/mysql.js";

const Product = {}

Product.save = ({ name, category, stock, description, actived = 1, price = 0.00, provider }) => new Promise((resolve, reject) => {
  const post = [name, category, stock, description, actived, price, provider]
  connection.query('INSERT INTO product (name, category, stock, description, actived, price, provider) VALUES (?, ?, ?, ?, ?, ?, ?)', post, (err, results) => {
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

Product.findById = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

export default Product

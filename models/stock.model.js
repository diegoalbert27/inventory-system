import connection from "../utils/mysql.js";

const Stock = {}

Stock.save = ({ initial, minimo }) => new Promise((resolve, reject) => {
  const post = [initial, initial, minimo]
  connection.query('INSERT INTO stock (stock, current_stock, stock_min) VALUES (?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Stock.findById = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM stock WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)

    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

Stock.findByIdAndUpdate = (id, { initial, current, minimo }) => new Promise((resolve, reject) => {
  connection.query('SELECT id FROM stock WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    const put = [initial, current, minimo, id]
    connection.query('UPDATE stock SET stock = ?, current_stock = ?, stock_min = ? WHERE id = ?', put, (err, results) => {
      if (err) reject(err)
    
      resolve(results)
    })
  })
})

export default Stock

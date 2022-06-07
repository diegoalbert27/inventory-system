import connection from "../utils/mysql.js";

const Customer = {}

Customer.save = ({ name, cedula, address, phone, email, actived = 1 }) => new Promise((resolve, reject) => {
  const post = [name, cedula, address, phone, email, actived]
  connection.query('INSERT INTO customer (name, cedula, address, phone, email, actived) VALUES (?, ?, ?, ?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Customer.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM customer', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Customer.findByIdAndUpdate = (id, { name, cedula, address, phone, email, actived }) => new Promise((resolve, reject) => {
  connection.query('SELECT id FROM customer WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    const put = [name, cedula, address, phone, email, actived, id]
    connection.query('UPDATE customer SET name = ?, cedula = ?, phone = ?, address = ?, email = ?, actived = ? WHERE id = ?', put, (err, results) => {
      if (err) reject(err)
    
      resolve(results)
    })
  })
})


Customer.findById = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM customer WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

export default Customer

import connection from "../utils/mysql.js";

const Provider = {}

Provider.save = ({ name, rif, phone, address, actived = 1 }) => new Promise((resolve, reject) => {
  const post = [name, rif, phone, address, actived]
  connection.query('INSERT INTO provider (name, rif, phone, address, actived) VALUES (?, ?, ?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Provider.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM provider', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Provider.findByIdAndUpdate = (id, { name, rif, phone, address, actived }) => new Promise((resolve, reject) => {
  connection.query('SELECT id FROM provider WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    const put = [name, rif, phone, address, actived, id]
    connection.query('UPDATE provider SET name = ?, rif = ?, phone = ?, address = ?, actived = ? WHERE id = ?', put, (err, results) => {
      if (err) reject(err)
    
      resolve(results)
    })
  })
})


Provider.findById = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM provider WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

export default Provider

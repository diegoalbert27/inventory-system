import connection from "../utils/mysql.js";

const Category = {}

Category.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Category.findById = (id) => new Promise((resolve, reject ) => {
  connection.query('SELECT * FROM category WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)

    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

Category.save = ({ name, codigo, address, actived = 1 }) => new Promise((resolve, reject) => {
  const post = [name, codigo, actived]
  connection.query('INSERT INTO category (name, codigo, actived) VALUES (?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

Category.findByIdAndUpdate = (id, { name, codigo, actived }) => new Promise((resolve, reject) => {
  connection.query('SELECT id FROM category WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    const put = [name, codigo, actived, id]
    connection.query('UPDATE category SET name = ?, codigo = ?, actived = ? WHERE id = ?', put, (err, results) => {
      if (err) reject(err)
    
      resolve(results)
    })
  })
})

export default Category

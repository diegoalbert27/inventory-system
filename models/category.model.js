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

export default Category

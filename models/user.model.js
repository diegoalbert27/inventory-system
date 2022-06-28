import connection from "../utils/mysql.js";

const User = {}

User.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

User.findById = (id) => new Promise((resolve, reject ) => {
  connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)

    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

User.save = ({ username, password, email, nivel = 10, actived = 1 }) => new Promise((resolve, reject) => {
  const post = [username, password, actived, nivel, email]
  connection.query('INSERT INTO user (username, password, actived, nivel, email) VALUES (?, ?, ?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

User.findByIdAndUpdate = (id, { username, password, email, nivel, actived }) => new Promise((resolve, reject) => {
  connection.query('SELECT id FROM user WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    const put = [username, password, actived, nivel, email, id]
    connection.query('UPDATE user SET username = ?, password = ?, actived = ?, nivel = ?, email = ? WHERE id = ?', put, (err, results) => {
      if (err) reject(err)
    
      resolve(results)
    })
  })
})

export default User

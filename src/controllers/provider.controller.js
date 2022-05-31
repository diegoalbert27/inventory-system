import connection from "../utils/mysql.js";

export const getProviders = (req, res) => {
  let sql = 'SELECT * FROM provider'
  
  connection.query(sql, (err, results, fields) => {
    if (err) if (err) res.status(500).json({ message: err })

    res.json({ providers: results })
  })
}



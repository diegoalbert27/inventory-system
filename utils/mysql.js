import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventory_system'
})

connection.connect(err => {
  if (err) console.log('Error connecting: ' + err.stack)

  console.log('Connected to DB ' + connection.threadId)
})

export default connection

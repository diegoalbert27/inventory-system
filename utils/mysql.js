import mysql from 'mysql'
import { config } from 'dotenv'
config()

let connection = null

const { NODE_ENV } = process.env

if (NODE_ENV === 'production') {
  connection = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    ssl : {
      rejectUnauthorized: false
    }
  });

  connection.getConnection(function(err, conn) {
    if (err) console.log('Error connecting: ' + err.stack)

    console.log('Connected to DB ' + conn.threadId)
  });
}

if (NODE_ENV === 'development') {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory_system'
  })

  connection.connect(err => {
    if (err) console.log('Error connecting: ' + err.stack)

    console.log('Connected to DB ' + connection.threadId)
  })
}

export default connection

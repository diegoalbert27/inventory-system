import connection from "../utils/mysql.js";

const ProviderProduct = {}

ProviderProduct.save = ({ provider, product, actived = 1 }) => new Promise((resolve, reject) => {
  const post = [provider, product, actived]
  connection.query('INSERT INTO provider_product (provider, product, actived) VALUES (?, ?, ?)', post, (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

ProviderProduct.find = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM provider_product', (err, results) => {
    if (err) reject(err)

    resolve(results)
  })
})

ProviderProduct.findById = (id) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM provider_product WHERE id = ?', [id], (err, results) => {
    if (err) reject(err)
    
    if (!results.length) 
      return resolve(false)

    resolve(results)
  })
})

export default ProviderProduct

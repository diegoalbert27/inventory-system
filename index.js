import app from './app.js'

const PORT = process.env.PORT || 4000

app.listen(PORT)
console.log('Server runnig on http://localhost:' + PORT)

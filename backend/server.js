const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// Configure CORS to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!', status: 'success' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

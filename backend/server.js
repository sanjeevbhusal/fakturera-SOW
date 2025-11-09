const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const { db } = require('./db')
const { eq, desc } = require('drizzle-orm')
const { usersTable, translationsTable, productsTable } = require('./db/schema')

const app = express()
const port = 3000

// Configure CORS to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}))

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/translations', async (req, res) => {
  const language = req.query.language;

  const translations = await db.select().from(translationsTable).where(eq(translationsTable.language, language));
  const translation = translations[0]

  if (!translation) {
    return res.status(404).json({ message: 'Translation not found' });
  }

  res.json(translation.translations)
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
  const user = users[0]

  // Ideally you would compare the password hash. 
  if (!user || user.password !== password) {
    return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }

  // generate a jwt token with user id as payload. 
  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '7d' });

  res.json({
    status: 'success',
    token,
    user: { email: user.email, name: user.name }
  });
})

app.post('/validate-token', async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    const users = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id));
    const user = users[0]

    if (!user) {
      throw new Error('Invalid token');
    }

    return res.json({
      status: 'success',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
})

app.get('/products', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    const users = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id));
    const user = users[0]

    if (!user) {
      throw new Error('Invalid token');
    }

    const products = await db.select().from(productsTable).where(eq(productsTable.userId, user.id)).orderBy(desc(productsTable.createdAt));
    return res.json(products)

  } catch {
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { articleNo, name, inPrice, price, unit, inStock, description } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    const users = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id));
    const user = users[0]

    if (!user) {
      throw new Error('Invalid token');
    }

    const products = await db.select().from(productsTable).where(eq(productsTable.id, id))
    const product = products[0]

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' })
    }

    await db.update(productsTable).set({
      articleNo: articleNo || product.articleNo,
      name: name || product.name,
      inPrice: inPrice || product.inPrice,
      price: price || product.price,
      unit: unit || product.unit,
      inStock: inStock || product.inStock,
      description: description || product.description
    }).where(eq(productsTable.id, id))

    return res.json({
      status: 'success',
      message: 'Product updated successfully'
    })

  } catch {
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
})

app.listen(port, '0.0.0.0', async () => {
  console.log(`Example app listening on port ${port}`)
})

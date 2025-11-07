const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// Configure CORS to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}))

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!', status: 'success' })
})


const ENGLISH_TRANSLATIONS = {
  navBar: {
    home: "Home",
    order: "Order",
    ourCustomers: "Our Customers",
    aboutUs: "About Us",
    contactUs: "Contact Us",
  },
  login: {
    loginText: "Log in",
    emailLabel: "Enter your email address",
    emailPlaceholder: "Email address",
    passwordLabel: "Enter your password",
    passwordPlaceholder: "Enter your password",
    registerText: "Register",
    forgotPasswordText: "Forgot Password",
  }

};

const SWEDISH_TRANSLATIONS = {
  navBar: {
    home: "Hem",
    order: "Beställ",
    ourCustomers: "Våra Kunder",
    aboutUs: "Om oss",
    contactUs: "Kontakta oss",
  },
  login: {
    loginText: "Logga in",
    emailLabel: "Skriv in din epost adress",
    emailPlaceholder: "Epost adress",
    passwordLabel: "Skriv in ditt lösenord",
    passwordPlaceholder: "Lösenord",
    registerText: "Registrera dig",
    forgotPasswordText: "Glömt lösenord?",
  }
};

app.get('/translations', (req, res) => {
  const language = req.query.language;
  if (language === 'svenska') {
    res.json(SWEDISH_TRANSLATIONS);
  } else if (language === 'english') {
    res.json(ENGLISH_TRANSLATIONS);
  } else {
    res.status(400).json({ message: 'Invalid language' });
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    res.json({
      status: 'success',
      token: 'authtoken',
      user: { email: email, name: 'Test User' }
    });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }
})

app.post('/validate-token', (req, res) => {
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  const { token } = req.body

  if (token === 'authtoken') {
    res.json({
      status: 'success',
      user: { email: 'test@example.com', name: 'Test User' }
    });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

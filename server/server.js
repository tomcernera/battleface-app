const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const auth = require('./middleware/auth');

const login = require('./routes/login');
const quotation = require('./routes/quotation');

const dist = __dirname + '\\..\\dist\\battleface-app\\'

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.options('*',cors());
app.use(express.json());

app.use(express.static(dist));
app.get('*', (req, res) => {
  res.sendFile(dist + 'index.html');
})
app.use('/login', login);
app.use(auth.authenticateToken);
app.use('/quotation', quotation);
 

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
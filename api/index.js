const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Users');
const app = express();
const port = 4000;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const secret = 'xenosxenos'; 

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect('mongodb+srv://xenos:blackisbest@cluster0.ftvqjm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({ 
    username, 
    password: bcrypt.hashSync(password, salt) 
  });
  res.json(userDoc);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  
  if (!userDoc) {
    return res.status(400).json('User not found');
  }
  
  const passOk = bcrypt.compareSync(password, userDoc.password);
  
  if (passOk) {
    // Logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
        message: 'OK'
      });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});


app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

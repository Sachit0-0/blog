const express = require('express')
const app = express()
const port = 4000

app.post('/register', (req, res) => {
  res.json('Hello Worlsdsdds!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
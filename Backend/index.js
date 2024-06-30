const connectToMongo=require('./db')
const express = require('express')

const app = express()
const port = 3000
app.use(express.json())//use to deal with json  

//Available ports
app.use('/api/auth',require('./routes/auth.js'))
// app.use('/api/notes',require('./route/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


connectToMongo();

//-D means i dont want to make part of my dependencies

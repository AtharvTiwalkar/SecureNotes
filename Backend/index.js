const connectToMongo=require('./db')
const express = require('express')
const app = express()
const port = 5000//changed to 5000 since we are using 3000 port for the react app 
app.use(express.json())//use to deal with json  

//Available ports
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`iNotebook listening on port http://localhost:${port}`)
})


connectToMongo();

//-D means i dont want to make part of my dependencies

const connectToMongo=require("./db")

connectToMongo()
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors');
var app1= express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const router = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')

// Load Configurations
dotenv.config();

// Register Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/public'))

// Register Router
router(app)

// Listeners
app.listen(process.env.PORT, () => {
  console.log(`Server up and running on PORT ${process.env.PORT}`)
})
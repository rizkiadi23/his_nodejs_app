const app = require('express')()
const dotenv = require('dotenv')
const router = require('./routes')
const bodyParser = require('body-parser')
const db = require('./models')

// Load Configurations
dotenv.config();

// DB Connection
db.authenticate()
.then(() => {
  console.log('Connection has been establised successfully')
})
.catch(err => {
  console.log('Unable to connect to the database: ', err)
})

// Register Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Register Router
router(app)

// Listeners
app.listen(process.env.PORT, () => {
  console.log(`Server up and running on PORT ${process.env.PORT}`)
})
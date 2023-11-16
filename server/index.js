const express = require('express')
const app = express()
require('./db')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const router = require('./routes/route')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wfqrcdh.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL)
    .then(() => {
        console.log('db connected')
    }).catch((err) => {
        console.log('db connection failed: ', err)
    })
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//Import dotnet for DB connection
const dotenv  = require('dotenv')
dotenv.config()

const cors = require('cors')
const listingRoutes = require('./routes/listing')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser').json()

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, ()=> console.log('mongo connected'))
//route middleware
app.use(cors())
app.use('/api/listing',bodyParser,listingRoutes)
app.use('/api/users',bodyParser,userRoutes)
//app.use(express.json())
app.listen(5000, () => console.log('SERVER UP AND RUNNING ON PORT 5000'))
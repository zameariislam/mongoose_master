const express = require('express')

const app = express()

app.use(express.json())

require('dotenv').config()


const port = process.env.PORT || 5000
const connectDatabase = require('./server')




//   routes 

const productRouter = require('./route/product.route')

app.use('/api/v1/product', productRouter)


app.get('/', (req, res) => {
    res.send('Hello ..')
})






app.listen(process.env.PORT, () => {
    console.log(`app is running on port   ${process.env.PORT}`)
    connectDatabase()
        .then((res) => console.log('database is connected'))
        .catch((err) => console.log(err.message))
})
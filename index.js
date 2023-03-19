const express = require('express')
const productRouter = require('./route/product.route')

const connectDatabase = require('./server')

const app = express()

app.use(express.json())

require('dotenv').config()


const port = process.env.PORT || 5000





//   routes 



app.use('/api/v1/product', productRouter)


// app.use('/api/v1/brand', brandRouter)


app.get('/', (req, res) => {
    res.send('Hello ..')
})






app.listen(process.env.PORT, () => {
    console.log(`app is running on port   ${process.env.PORT}`)
    connectDatabase()
        .then((res) => console.log('database is connected'))
        .catch((err) => console.log(err.message))
})
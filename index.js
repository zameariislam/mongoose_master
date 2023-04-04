const express = require('express')


const connectDatabase = require('./server')

const app = express()

app.use(express.json())






require('dotenv').config()


const port = process.env.PORT || 5000





//   routes 

const productRouter = require('./route/product.route')

app.use('/api/v1/product', productRouter)

const brandRouter = require('./route/brand.route')
const supplierRoute = require('./route/supplier.route')
const stockRoute = require('./route/stock.route')
const storeRoute = require('./route/store.route')


app.use('/api/v1/brand', brandRouter)
app.use('/api/v1/supplier', supplierRoute)
app.use('/api/v1/stock', stockRoute)
app.use('/api/v1/store', storeRoute)



app.get('/', (req, res) => {
    res.send('Hello ..')
})






app.listen(process.env.PORT, () => {
    console.log(`app is running on port   ${process.env.PORT}`)
    connectDatabase()
        .then((res) => console.log('database is connected'))
        .catch((err) => console.log(err.message))
})
const mongoose = require('mongoose')

const connectDatabase = async () => {
    await mongoose.connect(process.env.DATABASE_CONNECT_URI)

}

module.exports = connectDatabase
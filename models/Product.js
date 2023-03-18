const mongoose = require('mongoose')


// schema  design 


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        trim: true,
        unique: [true, 'Name must be unique'],
        minLength: [3, 'Name must be atleast 3 characters'],
        maxLength: [100, 'Name is too large']


    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product'],

    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price can not be negative']
    },

    unit: {
        type: String,
        required: [true, 'Please provide a unit for this product'],
        enum: {
            values: ['kg', 'liter', 'pcs'],
            message: `unit value cant be {VALUE}, must be kg/liter/pcs`
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity can not be negative'],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                return isInteger

            }
        },
        message: 'Quantity must be an integer'
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-stock', 'discontinued'],
            message: `unit value cant be {VALUE}, must be in-stock/out-stock/discontinued`
        }

    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supplier'

    // },
    // categories: [
    //     {
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         _id: mongoose.Schema.Types.ObjectId
    //     }

    // ]


}, { timestamps: true })


// mongoose middleware for saving data  pre/post


productSchema.pre('save', function (next) {

    if (this.quantity === 0) {
        this.status = 'out-stock'
    }

    next()

})

productSchema.post('save', function (doc, next) {
    console.log('I am in post')
    next()


})

productSchema.methods = function logger() {


    console.log('hello')

}


const Product = mongoose.model('Product', productSchema)

module.exports = Product





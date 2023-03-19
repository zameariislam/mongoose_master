const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types


// schema  design 


const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        trim: true,
        unique: [true, 'Name must be unique'],
        minLength: [3, 'Name must be atleast 3 characters'],
        maxLength: [100, 'Name is too large'],
        lowercase: true

    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product'],

    },


    unit: {
        type: String,
        required: [true, 'Please provide a unit for this product'],
        enum: {
            values: ['kg', 'litre', 'pcs', 'bag'],
            message: `unit value cant be {VALUE}, must be kg/liter/pcs`
        }
    },
    imageURLS: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false

                }
                let isValid = true

                value.forEach(url => {
                    if (!validator.isURL) {
                        isValid = false
                    }


                })
                return isValid


            }
        },
        message: "Please provide valide  image url"


    }],
    price: {
        type: Number,
        required: true,
        min: [0, 'product price can not be negative']

    },

    quantity: {
        type: Number,
        required: true,
        min: [0, 'product quantity can not be negative']

    },
    category: {
        type: String,
        required: true

    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true


        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            value: ['in-stock', 'out-stock', 'discontinued'],
            message: ' status can not be {VALUE} '
        }

    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            lowercase: true,
            enum: {
                values: ['dhaka', "rajshahi", "sylhet", "chittagram", "khulna", "barishal", "rangpur"],
                message: "{VALUE} is not a valid name"
            }

        },
        storeId: {
            type: ObjectId,
            required: true,
            ref: 'Store',

        }

    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,

            required: [true, 'Please Provide a supplier name']

        },
        supplierId: {
            type: ObjectId,
            ref: 'Supplier',
            required: true,


        }
    }




}, { timestamps: true })



const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock





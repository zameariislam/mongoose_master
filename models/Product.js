const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types


// schema  design 


const productSchema = new mongoose.Schema({
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
                    if (!validator.isURL(url)) {
                        isValid = false
                    }


                })
                return isValid

            }
        },
        message: "Please provide valide  image url"


    }],

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
    }


}, { timestamps: true })



const Product = mongoose.model('Product', productSchema)

module.exports = Product





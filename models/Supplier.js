const mongoose = require('mongoose');
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types

const supplierShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name '],
        trim: true,
        lowercase: true,

        minLength: [3, 'Name must be atleast 3 characters'],
        maxLength: [100, 'Name is too large'],


    },
    email: {
        type: String,
        validate: [validator.isEmail, "please provide a valid email"],
        lowercase: true,
        trim: true,
        unique: true
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
    contactNumber: [
        {
            type: String,
            required: [true, 'please provide a contact number'],
            validate: {
                validator: (value) => validator.isMobilePhone(value)
            },
            message: 'please provide a valid phone number'
        }
    ],
    emergencyContactNumber: {

        type: String,
        required: [true, 'please provide a emergency contact number'],
        validate: {
            validator: (value) => validator.isMobilePhone(value)
        },
        message: 'please provide a valid phone number'

    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, 'please provide  your trade licence number'],

    },
    presentAdress: {
        type: String,
        required: [true, 'please provide  your present adress'],

    },
    location: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
            values: ['dhaka', "rajshahi", "sylhet", "chittagram", "khulna", "barishal", "rangpur"],
            message: "{VALUE} is not a valid name"
        }

    },

    imageURL: {
        type: String,

        validate: [validator.isURL, 'please provide a valid url']

    },


    nationalIdImageURL: {
        type: String,

        validate: [validator.isURL, 'please provide a valid url']

    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: 'active'
    }


}, { timestamps: true })

const Supplier = mongoose.model('Supplier', supplierShema)

module.exports = Supplier

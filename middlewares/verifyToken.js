
// check if token exist 
// if not token send response 
// if token decode token 
// if if valid next 
var jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {


    try {
        const token = req.headers?.authorization?.split(' ')[1]
        if (!token) {


            return res.status(401).json({
                status: 'fail',
                error: 'You are not logged in'
            })

        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN);
        // const user = await User.findOne({ email: decoded.email })
        req.user = decoded

        next()


    }
    catch (err) {
        res.status(403).json({
            status: 'fail',
            error: 'invalid token'
        })


    }

}

module.exports = verifyToken
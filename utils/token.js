
var jwt = require('jsonwebtoken');

const generateToken = (userInfo) => {
    console.log('I am here')
    const payload = {
        email: userInfo.email,
        role: userInfo.role

    }

    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '20' })

    return token




}


module.exports = {
    generateToken
}
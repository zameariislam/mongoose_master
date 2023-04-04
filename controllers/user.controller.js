const { signupService, loginService, findUserByEmail } = require("../services/user.service")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")

const signup = async (req, res) => {



    try {

        const user = await signupService(req.body)
        res.status(200).json({
            status: 'succcess',
            user,
            message: 'User created successfully'

        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: err.message

        })

    }





}



//  1. check if the user is given email and password
//  2. load user with email
//  3.if not send response
//  
//  5. if yes compare password
//  6. if password is not correct send response
//  7. check user is active
//  8. if not active send response
//  9. generate token
//  10. send user and token


const login = async (req, res) => {

    try {

        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(401).json({
                status: 'fail',
                error: 'Please provide your credentials'
            })
        }


        const user = await findUserByEmail(email)
        console.log("user",user)

        if (!email) {
            return res.status(401).json({
                status: 'fail',
                error: 'No user Found.Please  signup'
            })
        }
        const isPasswordValid = user.comparePassword(password, user.password)
        console.log("ispass",isPasswordValid)

        

        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'failed',
                error: 'Password is not correct'
            })

        }

        if (user.status != "active") {
            return res.status(401).json({
                status: 'failed',
                error: 'Your account is not active !! '
            })



        }

        // generate token
        const token = generateToken(user)



        res.status(200).json({
            status: 'success',

            message: 'loggedin successfully',
            data: {
                user,
                token
            }

        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: err.message

        })

    }





}


module.exports = {
    signup,
    login
}
const User = require("../models/User")

const signupService = async (data) => {

    const user = await User.create(data)
    return user


}

const findUserByEmail= async (email)=>{

    const user=User.findOne({email})
    return user

}

const loginService = async (data) => {

    const user = await User.create(data)
    return user


}


module.exports = {
    signupService,
    loginService,
    findUserByEmail
}
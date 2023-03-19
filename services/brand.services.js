


const Brand = require("../models/Brand")

const createBrandService = async (data) => {
    console.log(data)
    const result = await Brand(data)





    return data


}

module.exports = {
    createBrandService

}
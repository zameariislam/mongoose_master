


const Brand = require("../models/Brand")

const createBrandService = async (data) => {

    const result = await Brand.create(data)
    return result


}


const getBrandsService = async () => {


    const brands = await Brand
        .find({})
        // .select('-products -suppliers')
        .populate('products')

    return brands
}



const getBrandServiceById = async (id) => {


    const brands = await Brand
        .find({ _id: id })
        .select('-products -suppliers')

    return brands
}


const updateBrandService = async (id,data) => {



    const brand = await Brand.updateOne({ _id: id }, { $set: data}, { runValidators: true })
   
    return brand

}

module.exports = {
    createBrandService,
    getBrandsService,
    getBrandServiceById,
    updateBrandService

}
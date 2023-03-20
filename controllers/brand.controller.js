const { createBrandService, getBrandsService, getBrandServiceById, updateBrandService } = require("../services/brand.services")

const createBrand = async (req, res) => {


    try {

        const brand = await createBrandService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'brand created successfully',
            data: brand
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'brand is not created',
            err: err.message

        })

    }


}


const getBrands = async (req, res) => {

    try {

        const brands = await getBrandsService()
        res.status(200).json({
            status: 'success',

            data: brands
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'can not get brands',
            err: err.message

        })

    }




}


const getBrandById = async (req, res) => {
    const { id } = req.params

    try {

        const brand = await getBrandServiceById(id)
        res.status(200).json({
            status: 'success',

            data: brand
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'culd not get brand',
            err: err.message

        })

    }




}


const updateBrand = async (req, res, next) => {

    try {

        const { id } = req.params



        const updatedBrand = await updateBrandService(id, req.body)


        if (!updatedBrand.modifiedCount) {

            return res.status(500).json({
                status: 'failed',

                message: `could not update a brand with id ${id}`,


            })

        }
        res.status(200).json({
            status: 'success',

            data: updatedBrand
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: `could not update a brand with id ${id}`,
            err: err.message

        })

    }




}





module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand
}
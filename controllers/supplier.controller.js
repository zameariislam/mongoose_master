const { createSupplierService, getSuppliersService, updateSupplierService } = require("../services/supplier.service")

const createSupplier = async (req, res) => {
    
    try {

        const supplier = await createSupplierService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Supplier inserted successfully',
            data: supplier
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'supplier is not created',
            err: err.message

        })

    }



}

const getSuppliers = async (req, res) => {

    try {

        const suppliers = await getSuppliersService()
        res.status(200).json({
            status: 'success',

            data: suppliers
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: ' could not find suppliers',
            err: err.message

        })

    }




}
const updateSupplier = async (req, res, next) => {

    try {

        const { id } = req.params


        const supplier = await updateSupplierService (id, req.body)
        res.status(200).json({
            status: 'success',

            data: supplier
        })

    }
    catch (err) {
        res.status(500).json({
            status: 'failed',

            message: 'could not update the supplier',
            err: err.message

        })

    }

}

module.exports = {
    createSupplier,
    getSuppliers,
    updateSupplier

}
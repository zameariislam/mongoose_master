const Brand = require("../models/Brand")
const Supplier = require("../models/Supplier")

const createSupplierService = async (data) => {

    const result = await Supplier.create(data)
    return result



}

const getSuppliersService = async () => {

    const suppliers = await Supplier.find({})

    return suppliers
}


const updateSupplierService = async (id, data) => {



    const supplier = await Supplier.updateOne({ _id: id }, { $set: data }, { runValidators: true })

    return supplier

}

module.exports = {
    createSupplierService,
    getSuppliersService,
    updateSupplierService

}
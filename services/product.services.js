const Brand = require('../models/Brand')
const Product = require('../models/Product')

const getProductsService = async (filters, queries, fields) => {




    // const products = await Product.find({ _id: '64158ed4a81d5030d33974dd',name:"rice" })
    // const products = await Product.
    //     find({ $or: [{ _id: '64158ed4a81d5030d33974dd' }, { name: "dfff" }] })


    // const products = await Product.
    //     find({ status: { $ne: 'out-stock' } })
    // const products = await Product.
    //     find({ quantity: { $gt: 2 } })
    // const products = await Product.
    //     find({ name: ['rice', 'mango'] })

    // projection 

    // const products = await Product.
    //     find({}, 'name quantity -_id')

    // const products = await Product.
    // find({}).limit(3)
    // const products = await Product.
    //     find({}).sort({ quantity: -1 })
    // const products = await Product.
    // find({}).select({name:1})
    // const products = await  Product.
    // where('name').equals(/\w/)
    // .where("price")
    // .gt(50).lt(500)
    // .limit(3)
    // .sort(-1)

    // const products = await Product.findById('6415914cd5a3528e6366ff01')
    console.log(queries.skip)
    console.log(queries.limit)
    const products = await Product
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        .limit(queries.limit)
 
    const total = await Product.countDocuments(filters)
    const page = Math.ceil(total / queries.limit);

    return { products, total, page }
}

const createProductService = async (data) => {


    // instance creation>do something >save 

    // const product = new Product(req.body)
    // const result = await product.save()

    const product = await Product.create(data)
    const { _id: productId, brand } = product
    await Brand
        .updateOne({ _id: brand.id },
            { $push: { products: productId } })


    return product

}


const updateProductService = async (data) => {



    // const product = await Product.updateOne({ _id: id }, { $set: update }, { runValidators: true })
    const result = await Product.findById({ _id: id })
    const prpduct = await product.set(update).save()
    return product

}


const updateBulkProductService = async (data) => {

    // const products = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true })


    const products = [];

    data.ids.forEach((product) => {
        products.push(Product.updateOne({ _id: product.id }, product.data))

    })
    const result = await Promise.all(products)

    return result

}


const deleteProductByIdService = async (id) => {

    const result = await Product.deleteOne({ _id: id })



    return result

}

const deleteBulkProductService = async (ids) => {

    const result = await Product.deleteMany({ _id: ids })


    return result

}
deleteBulkProductService


module.exports = {
    getProductsService,
    createProductService,
    updateProductService,
    updateBulkProductService,
    deleteProductByIdService,
    deleteBulkProductService

}



const Product = require('../models/Product')

const getProductsService = async (data) => {



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

    const products = await Product.find({})
    return products
}

const createProductService = async (data) => {


    // instance creation>do something >save 

    // const product = new Product(req.body)
    // const result = await product.save()

    const product = await Product.create(data)
    return product

}


module.exports = {
    getProductsService,
    createProductService

}



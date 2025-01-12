import Product from "../models/product.model.js";

export const createProduct = async(req,res,next) => {
    try {
        const product = await Product.create(req.body); 
        // create a new product with the request body and product schema, recieved from the user and set the status to 201
        return res.status(201).json(product)
    } catch(error){
        next(error)
    }
}
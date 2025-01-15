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

export const deleteProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(errorHandler(404, 'Product not found'));
      }
  
      if (req.user.id !== product.userRef.toString()) {
        return next(errorHandler(403, 'You are not authorized to delete this product'));
      }
  
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been deleted!');
    } catch (error) {
      next(error);
    }
  };  
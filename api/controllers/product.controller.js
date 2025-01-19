import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";


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

  export const updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, 'Product not found!'));
    }
    if (req.user.id !== product.userRef) {
      return next(errorHandler(401, 'You can only update your own products!'));
    }
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (error) {
      next(error);
    }
  };

  export const getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id); // by using params, we get the id we passed in the url
      if (!product) {
        return next(errorHandler(404, 'Product not found!'));
      }
      res.status(200).json(product);
    }
    catch(error){
      next(error)
    }
  }
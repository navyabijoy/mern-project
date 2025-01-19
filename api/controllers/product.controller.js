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
  
  export const getProducts = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = parseInt(req.query.startIndex) || 0;
      
      const searchTerm = req.query.searchTerm || '';
      const category = req.query.category || '';
      const brand = req.query.brand || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';
      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || 1000000;
      const condition = req.query.condition || '';
  
      const searchQuery = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } }
        ],
        resalePrice: { $gte: minPrice, $lte: maxPrice }
      };
  
      if (category) {
        searchQuery.category = category;
      }
  
      if (brand) {
        searchQuery.brand = brand;
      }
  
      if (condition) {
        searchQuery.condition = condition;
      }
  
      const products = await Product.find(searchQuery)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      const total = await Product.countDocuments(searchQuery);
  
      const response = {
        products,
        total,
        hasMore: startIndex + products.length < total,
        currentPage: Math.floor(startIndex / limit) + 1,
        totalPages: Math.ceil(total / limit)
      };
  
      return res.status(200).json(response);
  
    } catch (error) {
      next(error);
    }
  };
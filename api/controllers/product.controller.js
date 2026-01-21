import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";
import { generateEmbedding, createProductText, cosineSimilarity } from "../utils/embeddings.js";


export const createProduct = async(req,res,next) => {
    try {
        // Generate embedding for the product
        const productText = createProductText(req.body);
        const embedding = await generateEmbedding(productText);
        
        // Add embedding to the product data
        const productData = {
            ...req.body,
            embedding: embedding || [] // Use empty array if embedding generation fails
        };
        
        const product = await Product.create(productData); 
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
      // Regenerate embedding if product details changed
      const productText = createProductText(req.body);
      const embedding = await generateEmbedding(productText);
      
      const updateData = {
        ...req.body,
        embedding: embedding || product.embedding || []
      };
      
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
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
      const category = req.query.category || 'all';
      const brand = req.query.brand || 'all';
      const sort_order = req.query.sort_order || 'createdAt_desc';
      const conditions = req.query.conditions || 'all';
      
      const [sort, order] = sort_order.split('_');

      const searchQuery = {};
      
      if (searchTerm) {
        searchQuery.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } }
        ];
      }
  
      if (category && category !== 'all') {
        searchQuery.category = category;
      }
  
      if (brand && brand !== 'all') {
        searchQuery.brand = brand;
      }
  
      if (conditions && conditions !== 'all' && conditions !== '') {
        const condArray = conditions.split(',');
        searchQuery.condition = { $in: condArray };
      }

      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || 1000000;
      searchQuery.resalePrice = { $gte: minPrice, $lte: maxPrice };
  
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

   // get similar products based on semantic similarity, uses cosine similarity between embeddings

   export const getSimilarProducts = async (req, res, next) => {
    try {
      const productId = req.params.id;
      const limit = parseInt(req.query.limit) || 5;
      
      const sourceProduct = await Product.findById(productId);
      if (!sourceProduct) {
        return next(errorHandler(404, 'Product not found!'));
      }
      
      if (!sourceProduct.embedding || sourceProduct.embedding.length === 0) {
        return res.status(200).json([]);
      }
      
      const allProducts = await Product.find({
        _id: { $ne: productId },
        embedding: { $exists: true, $ne: [] }
      });
      
      const productsWithScores = allProducts.map(product => ({
        product,
        similarity: cosineSimilarity(sourceProduct.embedding, product.embedding)
      }));
      
      // sort by similarity and get top N
      const similarProducts = productsWithScores
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        .map(item => item.product);
      
      res.status(200).json(similarProducts);
    } catch (error) {
      next(error);
    }
  };

  
  export const semanticSearch = async (req, res, next) => {
    try {
      const searchQuery = req.query.q;
      const limit = parseInt(req.query.limit) || 10;
      
      if (!searchQuery) {
        return next(errorHandler(400, 'Search query is required'));
      }
      
      // generate embedding for the search query
      const queryEmbedding = await generateEmbedding(searchQuery);
      
      if (!queryEmbedding) {
        return next(errorHandler(500, 'Failed to process search query'));
      }
      
      const allProducts = await Product.find({
        embedding: { $exists: true, $ne: [] }
      });
      
      // similarity scores
      const productsWithScores = allProducts.map(product => ({
        product,
        similarity: cosineSimilarity(queryEmbedding, product.embedding)
      }));
      
      // get top N
      const results = productsWithScores
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        .map(item => ({
          ...item.product.toObject(),
          similarityScore: item.similarity
        }));
      
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };
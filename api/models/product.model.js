import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    resalePrice: {
      type: Number,
      required: true,
    },
    swatchedTimes: {
      type: Number,
      required: false,
      default: 0,
    },
    condition: {
      type: String,
      required: true,
    },
    isAuthentic: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String], 
      required: true,
      default: [], 
    },
    userRef: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: false,
      default: [],
    },
  },
  { timestamps: true } 
);

const Product = mongoose.model('Product', productSchema);

export default Product;

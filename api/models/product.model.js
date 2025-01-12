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
      default: 0, // default value if not provided
    },
    condition: {
      type: String,
      required: true,
    },
    isAuthentic: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array, // Array of image URLs
      required: true,
    },
    userRef: {
      type: String, // Reference to the User who listed the product
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);

export default Product;

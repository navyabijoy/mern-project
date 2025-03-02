import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createProduct)
router.delete('/delete/:id',verifyToken, deleteProduct)
router.post('/update/:id',verifyToken, updateProduct)
router.get('/get/:id', getProduct) // to fetch the product from the id for update
router.get('/get', getProducts) // to fetch all the products for search functionality
export default router;
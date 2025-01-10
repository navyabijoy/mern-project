import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.get("/test",test) 
/* test is getting imported from controller, 
as the confirm message is generally considered as a controller
we use GET as we want to recieve the information */

router.post('/update/:id',verifyToken,updateUser)
export default router;
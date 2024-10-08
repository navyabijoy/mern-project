import express from 'express';
import { test } from '../controllers/user.controller'

const router = express.Router();
//we need to 'GET' the information from the api
router.get('/test', test);

//all routes should be defined in the index.js

export default router;
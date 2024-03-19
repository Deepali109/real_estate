import express from "express";
import { test, updateUser, deleteUser, getUserListings, getUser } from "../Controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.get("/test", test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser)

export default router;
// 65f1481ec1d6793b2dcc6868
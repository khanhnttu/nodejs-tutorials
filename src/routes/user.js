import express from "express";
import {
    createUserController,
    detailsUserController,
    loginUserController,
    userController,
    searchUserController,
    updateUserController,
    deleteUserController,
    getAllUserController,
    deleteAllUserController,
    userRefreshTokenController
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/search', searchUserController)

router.get('/getAll', getAllUserController)

router.put('/update/:id', updateUserController)

router.delete('/delete/:id', deleteUserController)

router.delete('/deleteMany', deleteAllUserController)

router.get('/:userId', detailsUserController)

router.post('/login', loginUserController)

router.post('/', createUserController)

router.get('/', userController)

router.post('/refreshToken', userRefreshTokenController)



export default router
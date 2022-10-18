import express from "express";
import { detailsStudentController, studentController } from "../controllers/studentController.js";

const router = express.Router()

router.get('/', studentController)

router.get('/details', detailsStudentController)

export default router
import { Router } from "express";
import csvController from "../controllers/csv.controller.js";
import getEmployees from "../controllers/employee.controller.js";
import uploadFile from '../middleware/upload.js'

export const router = Router();

router.post("/csv/upload", uploadFile.single('file'),  csvController.upload);

router.get("/csv/download", csvController.download);

router.get("/employees", getEmployees);

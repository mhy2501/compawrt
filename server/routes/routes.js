import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getUser,
  loginUser,
  registerUser,
  verifyUser,
  deleteUser,
  updateUser,
} from "./users.js";
import {
  getReport,
  getReports,
  postReport,
  deleteReport,
  updateReport,
  editReport,
} from "./reports.js";
import {
  getOrganization,
  postOrganization,
  deleteOrganization,
  updateOrganization,
} from "./organizations.js";
import {
  getAnimalInfo,
  getAnimalInfos,
  postAnimalInfo,
  deleteAnimal,
  updateAnimalInfo,
  editAnimal,
} from "./animal_infos.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get("/user", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", auth, verifyUser);
router.delete("/user", auth, deleteUser);
router.put("/user", auth, updateUser);

router.get("/reports", auth, getReport);
router.get("/allReports", auth, getReports);
router.post("/report", auth, upload.single("strayImage"), postReport);
router.delete("/report/:id", auth, deleteReport);
router.put("/report/:id", auth, upload.single("strayImage"), updateReport);
router.get("/report/:id", auth, editReport);

router.get("/organization", getOrganization);
router.post("/organization", postOrganization);
router.delete("/organization/:id", auth, deleteOrganization);
router.put("/organization/:id", auth, updateOrganization);

router.get("/animalInfos", auth, getAnimalInfo);
router.get("/allAnimalInfos", getAnimalInfos);
router.post("/animalInfo", auth, upload.single("strayImage"), postAnimalInfo);
router.delete("/animalInfo/:id", auth, deleteAnimal);
router.put("/animalInfo/:id", auth, upload.single("strayImage"), updateAnimalInfo);
router.get("/animalInfo/:id", auth, editAnimal);

export { router };

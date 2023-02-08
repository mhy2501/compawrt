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
  postAnimalInfo,
  deleteAnimal,
  updateAnimalInfo,
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
router.post("/report", auth, upload.single("strayImage"), postReport);
router.delete("/report/:id", auth, deleteReport);
router.put("/report/:id", auth, upload.single("strayImage"), updateReport);
router.get("/report/:id", auth, editReport);

router.get("/organization", getOrganization);
router.post("/organization", postOrganization);
router.delete("/organization/:id", auth, deleteOrganization);
router.put("/organization/:id", auth, updateOrganization);

router.get("/animal_infos", auth, getAnimalInfo);
router.post("/animal_info", auth, postAnimalInfo);
router.delete("/animal_info/:id", auth, deleteAnimal);
router.put("/animal_info/:id", auth, updateAnimalInfo);

export { router };

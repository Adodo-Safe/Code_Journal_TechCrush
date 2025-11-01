import express from "express";
import {
  renderLogin,
  adminLogin,
  getDashboard,
  deleteJournal,
  getUserJournals
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", renderLogin);
router.post("/login", adminLogin);
router.get("/dashboard", getDashboard);
router.post("/delete/:id", deleteJournal);
router.get("/user/:email", getUserJournals);

export default router;
import express from "express";
import {
  getJournals,
  renderAddPage,
  createJournal,
  deleteUserJournal
} from "../controllers/journalController.js";

const router = express.Router();

router.get("/", getJournals);
router.get("/add", renderAddPage);
router.post("/add", createJournal);
router.post("/delete", deleteUserJournal);

export default router;
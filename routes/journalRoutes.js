import express from "express";
import {
  getJournals,
  renderAddPage,
  createJournal,
  deleteUserJournal
} from "../controllers/journalController.js";
import Journal from "../models/journalModel.js";

const router = express.Router();

router.get("/", getJournals);
router.get("/add", renderAddPage);
router.post("/add", createJournal);
router.post("/delete", deleteUserJournal);

router.get("/api/all", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/user/:email", async (req, res) => {
  try {
    const journals = await Journal.find({ email: req.params.email }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
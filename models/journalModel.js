import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  title: {type: String, required: true},
  note: {type: String, required: true},
  email: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
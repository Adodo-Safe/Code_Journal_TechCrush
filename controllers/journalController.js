import Journal from "../models/journalModel.js";
import { sendMail } from "../config/mail.js";

export const getJournals = async (req, res)=>{
  try{
    const journals = await Journal.find().sort({ date: -1});
    res.render("index", { journals });
  } catch (err){
    console.error(err);
    res.status(500).send("Server eeror");
  }
};

//Render add page 
export const renderAddPage = (req, res)=>{
  res.render("add");
};

// create journal + send comfirmation email
export const createJournal = async (req, res)=>{

try {
    const { title, note, email } = req.body;
    if (!title || !note || !email) return res.status(400).send("All fields are required");
    const journal = await Journal.create({ title, note, email });

    // send confirmation
    const subject = "CodeJournal — Entry saved";
    const html = `
      <h3>Hi there 👋</h3>
      <p>Your journal "<strong>${title}</strong>" has been saved.</p>
      <p>${note}</p>
      <hr>
      <small>Saved on ${new Date(journal.date).toLocaleString()}</small>
    `;
    try {
      await sendMail(email, subject, html);
    } catch (mailErr) {
      console.error("Mail error:", mailErr.message || mailErr);
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

// User deletes own journal by verifying email
export const deleteUserJournal = async (req, res) => {
  try {
    const { id, email } = req.body;
    if (!id || !email) return res.status(400).send("Missing id or email");

    const journal = await Journal.findById(id);
    if (!journal) return res.status(404).send("Journal not found");

    if (journal.email !== email) return res.status(403).send("Unauthorized: email mismatch");

    await Journal.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

import Journal from "../models/journalModel.js";
import { sendMail } from "../config/mail.js";

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    res.render("index", { journals, success: req.query.success });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Render add page
export const renderAddPage = (req, res) => {
  res.render("add");
};

// Create journal + send confirmation email
export const createJournal = async (req, res) => {
  try {
    const { title, note, email } = req.body;
    if (!title || !note || !email)
      return res.status(400).send("All fields are required");

    const journal = await Journal.create({ title, note, email });

    const subject = "CodeJournal – Entry Saved Successfully";
    const html = `
      <h2>Hello,</h2>
      <p>Your journal entry titled <strong>${title}</strong> has been successfully saved.</p>
      <p><strong>Note:</strong> ${note}</p>
      <p>Date: ${new Date(journal.date).toLocaleString()}</p>
      <hr>
      <p>Thank you for using CodeJournal.</p>
    `;

    try {
      await sendMail(email, subject, html);
      console.log(`Confirmation email sent successfully to ${email}`);
    } catch (mailErr) {
      console.error("Email sending error:", mailErr.message || mailErr);
    }

    res.redirect("/?success=1");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

// User deletes own journal by verifying email
export const deleteUserJournal = async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id || !email)
      return res.status(400).json({ success: false, message: "Missing id or email" });

    const journal = await Journal.findById(id);
    if (!journal)
      return res.status(404).json({ success: false, message: "Journal not found" });

    if (journal.email !== email)
      return res.status(403).json({ success: false, message: "Unauthorized: email mismatch" });

    await Journal.findByIdAndDelete(id);

    console.log(`Journal with ID ${id} deleted by ${email}`);

    return res.status(200).json({
      success: true,
      message: "Journal deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
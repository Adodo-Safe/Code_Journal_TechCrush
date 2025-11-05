import Journal from "../models/journalModel.js";
import { sendMail } from "../config/mail.js";

// Fetch all journals and render homepage
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    res.render("index", { 
      journals, 
      success: req.query.success, 
      deleted: req.query.deleted 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Render the page to add a new journal
export const renderAddPage = (req, res) => {
  res.render("add");
};

// Create a new journal entry and send confirmation email
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

// Delete a journal entry (verifies ID and email)
export const deleteUserJournal = async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id || !email) {
      const msg = { success: false, message: "Missing id or email" };
      return req.headers["content-type"]?.includes("application/json")
        ? res.status(400).json(msg)
        : res.redirect("/?deleted=0");
    }

    const journal = await Journal.findById(id);
    if (!journal) {
      const msg = { success: false, message: "Journal not found" };
      return req.headers["content-type"]?.includes("application/json")
        ? res.status(404).json(msg)
        : res.redirect("/?deleted=0");
    }

    if (journal.email !== email) {
      const msg = { success: false, message: "Unauthorized: email mismatch" };
      return req.headers["content-type"]?.includes("application/json")
        ? res.status(403).json(msg)
        : res.redirect("/?deleted=0");
    }

    await Journal.findByIdAndDelete(id);
    console.log(`Journal with ID ${id} deleted by ${email}`);

    const msg = { success: true, message: "Journal deleted successfully" };
    return req.headers["content-type"]?.includes("application/json")
      ? res.status(200).json(msg)
      : res.redirect("/?deleted=1");
  } catch (err) {
    console.error(err);
    const msg = { success: false, message: err.message };
    return req.headers["content-type"]?.includes("application/json")
      ? res.status(400).json(msg)
      : res.redirect("/?deleted=0");
  }
};
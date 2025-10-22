import Journal from "../models/journalModel.js";

export const renderLogin = (req, res) => {
  res.render("adminLogin");
};

export const adminLogin = (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    // Note: no session/auth persistence (simple for project). Redirect to dashboard.
    return res.redirect("/admin/dashboard");
  }
  return res.send("❌ Incorrect admin password");
};

export const getDashboard = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    res.render("adminDashboard", { journals });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    await Journal.findByIdAndDelete(id);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

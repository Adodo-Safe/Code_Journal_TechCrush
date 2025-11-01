import Journal from "../models/journalModel.js";

export const renderLogin = (req, res) => {
  res.render("adminLogin");
};

export const adminLogin = (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.redirect("/admin/dashboard");
  }
  return res.send("Incorrect admin password");
};

export const getDashboard = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    const totalJournals = await Journal.countDocuments();

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const journalsThisWeek = await Journal.countDocuments({
      date: { $gte: weekAgo }
    });

    const uniqueUsers = await Journal.distinct("email");

    res.render("adminDashboard", {
      journals,
      analytics: {
        totalJournals,
        journalsThisWeek,
        uniqueUserCount: uniqueUsers.length
      }
    });
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

export const getUserJournals = async (req, res) => {
  try {
    const { email } = req.params; // get email from URL
    const journals = await Journal.find({ email }).sort({ date: -1 });

    res.render("userJournals", {
      email,
      journals
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
const Dealer = require("../models/Dealer");

const getDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find().populate("addedBy");
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dealers" });
  }
};

const addDealer = async (req, res) => {
  try {
    const newDealer = new Dealer({ ...req.body, addedBy: req.user.id });
    await newDealer.save();
    res.status(201).json(newDealer);
  } catch (error) {
    res.status(500).json({ error: "Failed to add dealer" });
  }
};

const updateDealer = async (req, res) => {
  try {
    const updatedDealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDealer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update dealer" });
  }
};

const deleteDealer = async (req, res) => {
  try {
    await Dealer.findByIdAndDelete(req.params.id);
    res.json({ message: "Dealer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete dealer" });
  }
};

module.exports = { getDealers, addDealer, updateDealer, deleteDealer };

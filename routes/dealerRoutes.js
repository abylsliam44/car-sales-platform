const express = require("express");
const { getDealers, addDealer, updateDealer, deleteDealer } = require("../controllers/dealerController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getDealers);
router.post("/", authMiddleware, addDealer);
router.put("/:id", authMiddleware, updateDealer);
router.delete("/:id", authMiddleware, deleteDealer);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const protect = require("../middleware/authMiddleware");
const { createNote, getNotes } = require("../controllers/notesController");

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;

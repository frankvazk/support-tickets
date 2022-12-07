const express = require("express");
const router = express.Router();
const noteRouter = require("./noteRoutes");
const protect = require("../middleware/authMiddleware");
const {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketsController");

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

//Re-route into noteRouter
router.use("/:ticketId/notes", noteRouter);

module.exports = router;

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
//Connect to Database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Routes
app.get("/", (req, res) =>
  res.status(201).json({ message: "Hello from JSON Response" })
);
app.use("/api/users", require("./routes/userRoutes"));

// Error Handler Middleware must be implemented after all Routes
app.use(errorHandler);

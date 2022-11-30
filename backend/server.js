const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
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

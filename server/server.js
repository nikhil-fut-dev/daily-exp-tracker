require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const incomeRoutes = require("./routes/income.routes");
const expenseRoutes = require("./routes/expense.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();
const cloudinary = require("./config/cloudinary");

cloudinary.api
  .ping()
  .then(() => console.log("Cloudinary Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/income", incomeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API Running Successfully 🚀",
  });
});

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth.routes");

const errorHandler = require("./middleware/error.middleware");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

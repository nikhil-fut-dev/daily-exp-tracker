require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const incomeRoutes = require("./routes/income.routes");
const expenseRoutes = require("./routes/expense.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const budgetRoutes = require("./routes/budget.routes");
const reportRoutes = require("./routes/report.routes");
const categoryRoutes = require("./routes/category.routes");

const connectDB = require("./config/db");

const app = express();

app.set("trust proxy", 1);

// Connect Database
connectDB();
const cloudinary = require("./config/cloudinary");

cloudinary.api
  .ping()
  .then(() => console.log("Cloudinary Connected"))
  .catch((err) => console.log(err));

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://cbnk-expe-tracker.onrender.com",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

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

app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

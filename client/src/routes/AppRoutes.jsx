import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income";
import Expense from "../pages/Expense";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import Budget from "../pages/Budget";
import Settings from "../pages/Settings/Settings";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/income" element={<Income />} />

        <Route path="/expense" element={<Expense />} />

        <Route path="/budgets" element={<Budget />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

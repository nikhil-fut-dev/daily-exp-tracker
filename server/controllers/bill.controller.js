const Bill = require("../models/Bill");

// ===============================
// Get All Bills
// ===============================
exports.getBills = async (req, res, next) => {
  try {
    const bills = await Bill.find({ user: req.user.id }).sort({
      dueDate: 1,
    });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// Create Bill
// ===============================
exports.createBill = async (req, res, next) => {
  try {
    const bill = await Bill.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Bill Created Successfully",
      bill,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// Update Bill
// ===============================
exports.updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    Object.assign(bill, req.body);

    await bill.save();

    res.status(200).json({
      success: true,
      message: "Bill Updated Successfully",
      bill,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// Delete Bill
// ===============================
exports.deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    await bill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bill Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

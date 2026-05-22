const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    wheelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wheel",
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

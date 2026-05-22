const mongoose = require("mongoose");

const wheelSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "STOPPED",
    },
    active: {
      type: Boolean,
      default: false,
    },
    entryFee: {
      type: Number,
      default: 100,
    },
    winnerPool: {
      type: Number,
      default: 0,
    },

    adminPool: {
      type: Number,
      default: 0,
    },

    appPool: {
      type: Number,
      default: 0,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    eliminationOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    eliminatedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lastEliminationAt: {
      type: Date,
      default: null,
    },
    startTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Wheel", wheelSchema);

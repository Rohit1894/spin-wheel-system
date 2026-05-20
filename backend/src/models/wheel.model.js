const mongoose = require("mongoose");

const wheelSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "STOPPED",
    },
    active:{
        type: Boolean,
        default: false
    },
    enteryFee:{
        type: Number,
        default: 100
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
  startTime: {
    type: Date,
  },
  
},
{
    timestamps: true,
});

module.exports = mongoose.model("Wheel", wheelSchema);
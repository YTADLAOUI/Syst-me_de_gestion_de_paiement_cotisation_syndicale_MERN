const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    month: {
      type: Number,
      required: true,
  },
    year: {
      type: Number,
      required: true,
  },
    appartement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appertement",
        required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
},{timestamps:true});

module.exports = mongoose.model("Payment", paymentSchema);
const mongoose = require("mongoose");
schema= mongoose.Schema;
const paymentSchema = new schema({
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
        ref: "Appartement",
        required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
},{timestamps:true});

module.exports = mongoose.model("Payment", paymentSchema);
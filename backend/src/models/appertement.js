const mongoose= require("mongoose");

schema=mongoose.Schema;

const appartementSchema = new schema(
  {
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      default: null,
    },
    ownerPhoneNumber: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
    },{ timestamps: true }
  );
  module.exports = mongoose.model("Appartement", appartementSchema);
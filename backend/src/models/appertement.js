const mongoose= require("mongoose");
schema=mongoose.Schema;

const apartmentSchema = new Schema(
  {
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
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
    },
  { timestamps: true }
);

const Apartment = mongoose.model("Appertement",apartmentSchema);


module.exports = Apartment;
import mongoose from "mongoose";

const bookingShema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", require: true },
  user: { type: mongoose.Schema.Types.ObjectId, require: true },
  name: { type: String, require: true },
  mobile: { type: Number, require: true },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  maxGuests: { type: Number, require: true },
  price: Number,
});

const Booking = mongoose.model("Booking", bookingShema);

export { Booking };

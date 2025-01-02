import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //
  title: String,
  addresse: String,
  photos: [String],
  description: String,
  features: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const Place = mongoose.model("Place", placeSchema);

export { Place };

import mongoose from "mongoose";

const nannySchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  fullName: String,
  phoneNumber: {
    type: String,
    // required: true
  },
  serviceType: {
    type: String,
    // required: true
  },
  profilePicture: String,
  rating: Number,
  age: {
    type: Number,
    //  required: true
  },
  availability: Boolean,
  shiftD: String,
  shiftW: String,
});

export default mongoose.model("nanny", nannySchema);

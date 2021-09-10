import mongoose from "mongoose";

const nannySchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
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
  city: {
    type: String,
    //required:true
  },
  pricing: {
    type: Number,
    //required
  },
  profilePicture: String,
  rating: Number,
  age: {
    type: Number,
    //  required: true
  },
  availability: Boolean,
  shiftStart: Number,
  shiftEnd: Number,
  shiftW: [Number],
});

export default mongoose.model("nanny", nannySchema);

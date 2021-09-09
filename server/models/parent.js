import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
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
  phoneNumber: String,
  defaultSearchSettings: new mongoose.Schema({
    region: String,
    city: String,
    rating: Number,
    price: [Number],
    targeAge: Number,
  }),
});

export default mongoose.model("parent", parentSchema);

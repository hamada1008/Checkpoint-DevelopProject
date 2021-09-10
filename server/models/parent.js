import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'
const parentSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  }, googleId: String,
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
    targetAge: Number,
  }),
});
parentSchema.plugin(passportLocalMongoose);
parentSchema.plugin(findOrCreate);
export default mongoose.model("parent", parentSchema);

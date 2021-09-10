import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const orderSchema = new mongoose.Schema({
  parent_id: String,
  nanny_id: String,
  orderDate: Date,
  productsPurchased: [String],
  totalPrice: Number,
  status: String,
});
orderSchema.plugin(passportLocalMongoose);
orderSchema.plugin(findOrCreate);
export default mongoose.model("order", orderSchema);

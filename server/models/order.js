import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  parent_id: String,
  nanny_id: String,
  orderDate: Date,
  productsPurchased: [String],
  totalPrice: Number,
  status: String,
});
export default mongoose.model("order", orderSchema);

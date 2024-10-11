import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: String,
    unique: true,
    required: true
  },
  interests: {
    type: [String],  // An array of strings to hold multiple interests
    default: []
  }
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;
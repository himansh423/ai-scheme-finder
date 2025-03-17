import mongoose from "mongoose";
const { Schema } = mongoose;

const savedSchemeSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  eligibility: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  TrustScore: {
    type: String,
    required: true,
  },
  schemeId: {
    type: String,
    required: true,
  },
});

const SavedSchemes =
  mongoose.models.SavedSchemes ||
  mongoose.model("SavedSchemes", savedSchemeSchema);

export default SavedSchemes;

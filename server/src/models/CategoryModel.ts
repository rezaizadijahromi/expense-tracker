import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: "Category is required",
    unique: true,
  },
});

const Category: any = mongoose.model("Category", categorySchema);

export default Category;

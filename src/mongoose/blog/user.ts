import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogUserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Made optional
  roles: [{ type: String, required: true }], // Made optional
});

const BlogUser = mongoose.model("BlogUser", blogUserSchema);

export default BlogUser;

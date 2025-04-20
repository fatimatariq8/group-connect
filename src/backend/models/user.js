import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    major: { type: String, required: true },
    batch: { type: String, required: true },
    gpa: { type: String },
    profileImage: {
        type: String,
        default: '', // Optional: set a default path if needed
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    isAvailable: { type: Boolean, default: true }
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      console.log("Password not modified. Skipping hashing...");
      return next();
  }

  console.log("Hashing password for user:", this.email);

  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      console.log("Hashed password:", this.password);
      next();
  } catch (error) {
      console.error("Error in password hashing middleware:", error);
      next(error);
  }
});

const User = mongoose.model('User', userSchema);
export default User;

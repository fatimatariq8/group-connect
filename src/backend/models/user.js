// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     major: { type: String, required: true },
//     batch: { type: String, required: true },
//     gpa: { type: String },
//     profileImage: {
//         type: String,
//         default: '', // Optional: set a default path if needed
//       },
// });

// const User = mongoose.model('User', userSchema);
// export default User;
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



// // Pre-save middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) {
//         console.log("Password not modified. Skipping hashing...");
//         return next();
//     }

//     console.log("Hashing password...");
//     try {
//         // Hash the password with a salt round of 10
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         console.log("Hashed Password:", this.password);
//         next();
//     } catch (error) {
//         console.error("Error hashing password:", error);
//         next(error); // Pass any errors to the next middleware
//     }
// });


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


// // Method to compare provided password with stored hashed password
// userSchema.methods.comparePassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

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
});

const User = mongoose.model('User', userSchema);
export default User;

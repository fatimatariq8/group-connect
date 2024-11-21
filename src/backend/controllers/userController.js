import User from '../models/user.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import fs from 'fs';
// Configure storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Export the upload middleware
export { upload };


// // Create a new user
// export const createUser = async (req, res) => {
//     const { name, email, password, major, batch, gpa } = req.body;
//     try {
//         const newUser = new User({ name, email, password, major, batch, gpa });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

export const createUser = async (req, res) => {
  const { name, email, password, major, batch, gpa } = req.body;

  try {
      console.log("Incoming request to create user:", req.body);

      const newUser = new User({
          name,
          email,
          password, // Plain-text password
          major,
          batch,
          gpa,
      });

      console.log("Before saving user:", newUser);

      await newUser.save();

      console.log("User successfully created:", {
          _id: newUser._id,
          email: newUser.email,
          password: newUser.password, // This should be hashed
      });

      res.status(201).json({
          message: "User created successfully",
          user: {
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              major: newUser.major,
              batch: newUser.batch,
              gpa: newUser.gpa,
          },
      });
  } catch (error) {
      console.error("Error in createUser:", error);
      res.status(400).json({ error: "Error creating user" });
  }
};




// // Get all users
// export const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a specific user by ID
// export const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update a user by ID
// export const updateUser = async (req, res) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (updatedUser) {
//             res.json(updatedUser);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delete a user by ID
// export const deleteUser = async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (user) {
//             res.json({ message: 'User deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (user && user.password === password) {  // For simplicity; consider hashing passwords
//             res.status(200).json({ message: 'Login successful', user });
//         } else {
//             res.status(401).json({ error: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };


// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             // If the user with the email doesn't exist
//             return res.status(400).json({ error: 'Invalid email' });
//         }

//         // Compare the plain-text password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             // If the password is incorrect
//             return res.status(400).json({ error: 'Invalid password' });
//         }

//         // Login successful
//         res.status(200).json({
//             message: 'Login successful',
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 major: user.major,
//                 batch: user.batch,
//             },
//         });
//     } catch (error) {
//         // Handle server errors
//         console.error("Login error:", error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          // Invalid email
          return res.status(400).json({ error: "Invalid email" });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          // Invalid password
          return res.status(400).json({ error: "Invalid password" });
      }

      // Login successful
      res.status(200).json({
          message: "Login successful",
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              major: user.major,
              batch: user.batch,
          },
      });
  } catch (error) {
      console.error("Error in loginUser:", error);
      res.status(500).json({ error: "Server error" });
  }
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       // Log the incoming request
//       console.log("Login Request Received:", { email });

//       // Check if the user exists in the database
//       const user = await User.findOne({ email });
//       if (!user) {
//           console.log("User not found for email:", email);
//           return res.status(400).json({ error: "Invalid email" });
//       }

//       console.log("User retrieved from database:", user);

//       // Compare the provided password with the hashed password
//       console.log("Plain text password from request:", password);
//       console.log("Hashed password from database:", user.password);

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       console.log("Password comparison result:", isPasswordValid);

//       if (!isPasswordValid) {
//           console.log("Invalid password for email:", email);
//           return res.status(400).json({ error: "Invalid password" });
//       }

//       // If login is successful
//       console.log("Login successful for user:", user._id);
//       res.status(200).json({
//           message: "Login successful",
//           user: {
//               _id: user._id,
//               name: user.name,
//               email: user.email,
//               major: user.major,
//               batch: user.batch,
//           },
//       });
//   } catch (error) {
//       // Log any unexpected errors
//       console.error("Error in loginUser:", error);
//       res.status(500).json({ error: "Server error" });
//   }
// };



// src/backend/controllers/userController.js

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);  // This includes GPA if it's in the database
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Update user profile
export const updateProfile = async (req, res) => {
    const { name, email, major, batch, gpa } = req.body;
    const updatedProfile = { name, email, major, batch, gpa };
  
    // If there's an uploaded file, include it in the profile update
    if (req.file) {
      updatedProfile.profileImage = req.file.path;
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedProfile, { new: true });
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };


  export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If the user has a profile image, delete it from the server
    if (user.profileImage) {
      const imagePath = path.join('uploads', path.basename(user.profileImage));
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting profile image:", err);
      });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Server error' });
  }
};




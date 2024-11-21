import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import courseRoutes from './routes/courseRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

const app = express();
const PORT = 5000;


app.use(cors({
    origin: 'http://localhost:5173'
}));


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB

const mongoURI = "mongodb+srv://fatimatariq8:AIebicgo8wqu3sf8@cluster0.gmcfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI)
.then(()=> console.log('mongo connected'))
.catch(err=> console.log(err))

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/groups', groupRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
    res.send('Backend server is running with MongoDB connected');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express'
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 5173;

app.use(express.json()); // For parsing application/json

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

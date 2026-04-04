import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('EventHub API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

import express from 'express';
import cors from 'cors';
import chatbotRoutes from './routes/chatbotRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
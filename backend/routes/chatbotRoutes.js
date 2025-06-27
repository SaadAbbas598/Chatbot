import express from 'express';
import { chatWithBot } from '../controllers/chatbotController.js';

const router = express.Router();
router.post('/message', chatWithBot);
export default router;
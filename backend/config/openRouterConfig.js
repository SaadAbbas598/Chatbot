import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const openRouterInstance = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  }
});
export default openRouterInstance;
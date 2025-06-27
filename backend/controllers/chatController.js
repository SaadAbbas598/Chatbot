import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export const handleMessage = (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message must be a string' });
  }

  const filePath = path.join(__dirname, 'data', 'responses.json');
  const data = fs.readFileSync(filePath);
  const responses = JSON.parse(data);

  const lowerMessage = message.trim().toLowerCase();
  const reply = responses[lowerMessage] || "Sorry, I don't know the capital of that country or city.";

  res.json({ reply });
};

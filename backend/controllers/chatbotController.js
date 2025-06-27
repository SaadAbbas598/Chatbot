import openRouterInstance from '../config/openRouterConfig.js';

export const chatWithBot = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openRouterInstance.post('/chat/completions', {
      model: 'mistralai/mistral-7b-instruct', // ✅ REPLACED with supported model
      messages: [
        { role: 'system', content: 'You are a helpful assistant that gives capital cities of countries.' },
        { role: 'user', content: message }
      ]
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to communicate with OpenRouter' });
  }
};

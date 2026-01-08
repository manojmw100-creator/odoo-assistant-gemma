const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('GOOGLE_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(express.json());

// System prompt for Odoo assistant
const ODOO_SYSTEM_PROMPT = `You are an expert Odoo module developer and consultant. Your role is to help users:
1. Write Odoo modules and custom features
2. Understand Odoo architecture and best practices
3. Generate Python code following Odoo conventions
4. Explain Odoo model relationships, views, and workflows
5. Provide documentation and deployment guidance

Always:
- Follow Odoo 18 coding standards
- Provide complete, working code examples
- Include docstrings and comments
- Suggest security best practices
- Warn about common pitfalls`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = client.getGenerativeModel({ model: 'gemma-2-9b-it' });

    // Build full message context
    const messages = [
      ...conversationHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await model.generateContent({
      contents: messages,
      systemInstruction: ODOO_SYSTEM_PROMPT,
    });

    const reply = response.response.text();

    res.json({
      reply,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: reply }] }
      ]
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

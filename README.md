# Odoo Assistant with Gemma 🚀

AI-powered Odoo module development assistant using Google's Gemma model. Generate Odoo module code, documentation, and best practices with natural language prompts.

## Features

✨ **Key Capabilities:**
- **AI Code Generation** - Write Odoo modules using natural language
- **Best Practices Guidance** - Get Odoo 18 standards and security tips
- **Model Documentation** - Auto-generate docstrings and comments
- **Conversation Memory** - Maintain context across multiple messages
- **REST API** - Easy integration with any frontend

## Demo

```
User: Create an Odoo model for a library system with books
Assistant: Here's a complete library module with models for Books, Authors, and Borrowings...
```

## Tech Stack

- **Backend:** Node.js + Express.js
- **AI Model:** Google Gemma (via Google Generative AI API)
- **Frontend:** React 18 + Vite (optional, can be created locally)
- **Deployment:** Render, Railway, or Google Cloud Run

## Quick Start

### Prerequisites
- Node.js 16+
- Google API Key with Gemma access (get at [ai.google.dev](https://ai.google.dev))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/odoo-assistant-gemma.git
cd odoo-assistant-gemma

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

# Start backend server
npm start
# Server runs on http://localhost:3000
```

### Create Frontend (Optional)

```bash
npx create-vite@latest client --template react
cd client
npm install
npm run dev
```

Refer to **SETUP.md** for complete React component code.

## API Usage

### Chat Endpoint

**POST** `/api/chat`

```json
{
  "message": "Create a Python model for managing employee records in Odoo",
  "conversationHistory": []
}
```

**Response:**

```json
{
  "reply": "Here's a complete Odoo module for employee management...",
  "conversationHistory": [
    { "role": "user", "parts": [...] },
    { "role": "model", "parts": [...] }
  ]
}
```

### Health Check

**GET** `/api/health`

Returns: `{ "status": "OK" }`

## Project Structure

```
odoo-assistant-gemma/
├── server/
│   └── server.js              # Express backend with Gemma API integration
├── package.json               # Backend dependencies (Express, Cors, Dotenv, Google AI)
├── .env.example              # Environment variables template
├── README.md                 # This file
├── SETUP.md                  # Complete setup & deployment guide
└── .gitignore                # Git ignore file
```

## Deployment

Quick deployment options are documented in **SETUP.md**:

- **Render.com** - Free Node.js hosting (recommended for beginners)
- **Railway.app** - Simple deployment with env variable management
- **Google Cloud Run** - Serverless, pay-per-use

Example Render deployment takes <5 minutes after connecting GitHub repo.

## How It Works

1. **User sends message** via frontend or API
2. **Server receives request** and validates input
3. **Google Generative AI** processes message with Gemma model
4. **System prompt** ensures Odoo best practices in responses
5. **Conversation history** is maintained for context
6. **Response sent** back to user with full context preserved

## System Prompt (Odoo Assistant Role)

The model is instructed to:
- Write Python code following Odoo 18 standards
- Provide complete, working code examples
- Include security best practices
- Explain model relationships and views
- Generate documentation alongside code

## Use Cases

1. **Odoo Developers** - Accelerate module development
2. **Business Analysts** - Generate spec documentation
3. **Consultants** - Propose solutions to clients
4. **Trainers** - Create teaching examples
5. **Teams** - Standardize module structure

## Environment Variables

```bash
GOOGLE_API_KEY=your_key_here    # Required: Google Generative AI API key
PORT=3000                       # Optional: Server port (default: 3000)
NODE_ENV=development            # Optional: Environment (development/production)
```

## Troubleshooting

**Q: "GOOGLE_API_KEY not set" error**
- Ensure `.env` file exists in project root
- Verify key is from [ai.google.dev](https://ai.google.dev)
- Key must have Gemma API enabled

**Q: CORS errors in frontend**
- Backend already has CORS enabled
- Check frontend URL matches allowed origins in production

**Q: Conversation context is lost**
- Always pass `conversationHistory` array in requests
- Each message should include previous exchange

## Roadmap

- [ ] Database integration for message persistence
- [ ] User authentication & API keys
- [ ] Odoo module template generator
- [ ] Code syntax highlighting in frontend
- [ ] Export to downloadable .zip module
- [ ] Multi-model support (Gemini, Claude)
- [ ] Docker containerization

## Contributing

Contributions welcome! Areas to help:
- Frontend improvements
- Additional Odoo templates
- Deployment automation
- Documentation

## License

MIT License - See LICENSE file for details

## Links

- [Google Generative AI](https://ai.google.dev/)
- [Gemma Model Docs](https://ai.google.dev/gemma/docs)
- [Express.js](https://expressjs.com/)
- [React + Vite](https://vitejs.dev/)

## Support

For issues or questions:
1. Check **SETUP.md** for detailed instructions
2. Review API examples above
3. Open GitHub issue with reproduction steps

---

**Built with ❤️ for Odoo developers**

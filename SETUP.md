# Odoo Assistant Gemma - Setup & Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 16+ and npm
- Google API Key (Gemma access)
- Git

### Step 1: Clone & Install
```bash
git clone https://github.com/yourusername/odoo-assistant-gemma.git
cd odoo-assistant-gemma
npm install
```

### Step 2: Set Environment Variables
```bash
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
# Get key from https://ai.google.dev/
```

### Step 3: Start Backend
```bash
npm start
# Server runs on http://localhost:3000
```

### Step 4: Create React Frontend (Optional - GitHub has size limits)
Run locally:
```bash
npx create-vite@latest client --template react
cd client
npm install
npm run dev
```

## Frontend Code (React + Vite)

Create `client/src/App.jsx`:
```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages([...messages, { text: input, role: 'user' }]);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, role: 'assistant' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Error connecting to server', role: 'system' }]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h1>Odoo Assistant with Gemma</h1>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about Odoo modules..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default App;
```

## Deployment Options

### Backend Deployment (Node.js)

**Option A: Render.com** (Free tier available)
1. Push code to GitHub
2. Connect repo to Render
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables in Render dashboard

**Option B: Railway.app**
1. Connect GitHub repo
2. Auto-detects Node.js
3. Set `GOOGLE_API_KEY` in variables

**Option C: Google Cloud Run**
```bash
gcloud run deploy odoo-assistant \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars GOOGLE_API_KEY=your_key
```

### Frontend Deployment

**Option A: Vercel** (Recommended for React)
1. Fork this repo
2. Create `vercel.json` in client folder
3. Deploy client folder from Vercel dashboard
4. Update `VITE_API_URL` env var to your backend URL

**Option B: Netlify**
```bash
npm run build
# Deploy dist/ folder to Netlify
```

## File Structure
```
odoo-assistant-gemma/
├── server/
│   └── server.js          # Express backend with Gemma API
├── client/                # React frontend (create locally)
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── package.json           # Backend dependencies
├── .env.example          # Environment template
├── SETUP.md              # This file
└── README.md             # Project overview
```

## API Endpoints

- `POST /api/chat` - Send message, get Gemma response
- `GET /api/health` - Health check

### Request/Response Example
```json
POST /api/chat
{
  "message": "Create a Python model for a custom Odoo module",
  "conversationHistory": []
}

Response:
{
  "reply": "Here's a basic Odoo model template...",
  "conversationHistory": [...]
}
```

## Troubleshooting

1. **"GOOGLE_API_KEY not set"**
   - Check .env file exists with correct key
   - Ensure key has Gemma API access

2. **CORS errors**
   - Backend must have CORS enabled (already in code)
   - Frontend URL must match allowed origins

3. **Conversation context lost**
   - Pass `conversationHistory` array in requests
   - Server maintains context via message array

## Next Steps
- Add message persistence (MongoDB/Firebase)
- Implement user authentication
- Create Odoo module template generator
- Add code syntax highlighting
- Deploy to production servers

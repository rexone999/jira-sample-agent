const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { chat } = require('./utils/gemini');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public folder (including index.html, JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve atlassian-connect.json
app.get('/atlassian-connect.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'atlassian-connect.json'));
});

// Gemini chat endpoint
app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const reply = await chat(prompt);
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat error:", err.message);
    res.status(500).json({ reply: "AI agent failed to respond." });
  }
});

// Fallback for other unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend origin
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type'] // Allowed headers
}));

// ... existing code ... 
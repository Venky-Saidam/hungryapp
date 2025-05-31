const express = require('express');
require('dotenv').config(); // Load environment variables at the very top
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

const mongoDB = require("./db");
mongoDB();

const allowedOrigins = [
  "https://hungryapp-frontend.vercel.app",
  // Add Vercel preview URL pattern
  /https:\/\/hungryapp-frontend-.*-venky-saidams-projects\.vercel\.app/
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow needed methods
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

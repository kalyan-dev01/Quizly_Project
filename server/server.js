const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ConnectMongoDB } = require('./connection/connections');
const userRoute = require('./routes/userRoutes');
const quizRoute = require('./routes/quizRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
ConnectMongoDB(process.env.mongoUrl);

// Middleware
app.use(cors({
  // "http://localhost:5173", 
  origin: ["https://quizly-project-m31m.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/quiz',quizRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

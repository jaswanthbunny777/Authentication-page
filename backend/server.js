require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://authenticationpagejaswanth.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (origin.endsWith('.netlify.app')) return callback(null, true);
    callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running,sit tight');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

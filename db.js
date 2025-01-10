const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


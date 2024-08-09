const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./config/db');
var cors = require('cors');

// const deepgramRoute = require('./routes/deepgram');
// const gptRoute = require('./routes/gpt');
// const pollyRoute = require('./routes/polly');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
// app.use(express.json());
connectDb();

app.use(express.json({ extended: false }));
app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/conversationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Use routes
// app.use('/api/deepgram', deepgramRoute);
// app.use('/api/gpt', gptRoute);
// app.use('/api/polly', pollyRoute);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});

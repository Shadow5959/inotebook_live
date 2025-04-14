const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectToMongo = require('./db');
const app = require('./app');
connectToMongo();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../inotebook_frontend/build')));

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js')); 

// Catch-all handler to serve the React app for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../inotebook_frontend/build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});
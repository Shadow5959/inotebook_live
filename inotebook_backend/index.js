const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectToMongo = require('./db');
const app = require('./app');
connectToMongo();



app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js')); 




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});
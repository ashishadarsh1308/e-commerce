const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// configure dotenv
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// Red (!)
// Blue (?)
// Green (*)
// Yellow (^)
// Pink (&)
// Purple (~)
// Mustard (todo)
// Grey (//)
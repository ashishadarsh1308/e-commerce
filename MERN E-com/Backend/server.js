const app = require('./app');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the 'cors' middleware
const connectDatabase = require('./config/database');

app.use(cors()); // Use 'cors' middleware to allow cross-origin requests

// configure dotenv
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





//! Red (!)
//? Blue (?)
//* Green (*)
//^ Yellow (^)
//& Pink (&)
// Purple (~)
// todo Mustard (todo)
// Grey (//)
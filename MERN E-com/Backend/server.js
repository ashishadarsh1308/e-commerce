const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

// configure dotenv
dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

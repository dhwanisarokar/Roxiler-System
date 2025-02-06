const express = require('express');
const cors = require("cors");

const connectDB = require('./src/config/db.js');
const transactionRoutes = require('./src/routes/transactionRoutes.js');
const fetchDataAndStore = require('./src/utils/fetchData.js');
const config = require("./src/config/config.js");


connectDB();
fetchDataAndStore();

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use('/api', transactionRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

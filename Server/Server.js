const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/Db'); // Import the database configuration
const cors = require('cors');
const dotenv = require('dotenv').config();
const invoiceRoutes = require('./routes/InvoiceRoutes'); // Import the routes

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/invoices', invoiceRoutes); // Use the routes

app.listen(port, () => {
    console.log('Server is up on port', port);
});

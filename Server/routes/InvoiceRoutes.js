const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const generateInvoice = require('../utils/generateInvoice');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

router.post('/create-invoice', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();

    const doc = new PDFDocument();
    const fileName = `invoice-${orderData.orderDetails.orderNo}.pdf`;
    const filePath = path.join(__dirname, '..', 'invoices', fileName);
    
    // Ensure the invoices directory exists
    if (!fs.existsSync(path.join(__dirname, '..', 'invoices'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'invoices'));
    }
    
    doc.pipe(fs.createWriteStream(filePath));

    // Add PDF content here
    generateInvoice(doc, orderData);

    doc.end();

    res.send({ message: 'Invoice created successfully', path: filePath });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;

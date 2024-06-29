const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Constants for file paths
const LOGO_PATH = path.join(__dirname, '../amazonlogo.png');
const SIGNATURE_PATH = path.join(__dirname, '../signature.png');

function generateInvoice(doc, order) {
  // Invoice Header
  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, 40, 45, { width: 100 });
  }
  
  doc.fontSize(15)
     .text('Tax Invoice/Bill of Supply/Cash Memo', 200, 50, { align: 'right' })
     .fontSize(8)
     .text('(Original for Recipient)', 200, 65, { align: 'right' });

  // Seller Details
  doc.fontSize(8).font('Helvetica-Bold').text('Sold By:', 50, 100)
     .font('Helvetica').text(order.sellerDetails.name, 50, 115)
     .text(order.sellerDetails.address, 50, 130)
     .fontSize(8).font('Helvetica-Bold').text('PAN No:', 50, 185) 
     .fontSize(8).font('Helvetica').text(order.sellerDetails.pan, 83, 185)
     .fontSize(8).font('Helvetica-Bold').text('GST Registration No:', 50, 200) 
     .fontSize(8).font('Helvetica').text(order.sellerDetails.gst, 135, 200);

  // Billing and Shipping Address
  doc.font('Helvetica-Bold').text('Billing Address:', 430, 100)
     .font('Helvetica').text(order.billingDetails.name, 430, 115)
     .text(order.billingDetails.address, 430, 130)
     .text(`State/UT Code: ${order.billingDetails.stateCode}`, 430, 190);

  doc.font('Helvetica-Bold').text('Shipping Address:', 430, 205)
     .font('Helvetica').text(order.shippingDetails.name, 430, 220)
     .text(order.shippingDetails.address, 430, 235)
     .text(`State/UT Code: ${order.shippingDetails.stateCode}`, 430, 295);

  // Order Details
  doc.font('Helvetica-Bold').text('Order Number:', 50, 320)
     .font('Helvetica').text(order.orderDetails.orderNo, 110, 320)
     .font('Helvetica-Bold').text('Order Date:', 50, 335)
     .font('Helvetica').text(order.orderDetails.orderDate, 95, 335)
     .font('Helvetica-Bold').text('Place of Supply:', 427, 310)
     .font('Helvetica').text(order.placeOfSupply, 492, 310)
     .font('Helvetica-Bold').text('Place of Delivery:', 424, 325)
     .font('Helvetica').text(order.placeOfDelivery, 492, 325)
     .font('Helvetica-Bold').text('Invoice Number:', 449, 340)
     .font('Helvetica').text(order.invoiceDetails.invoiceNo, 514, 340)
     .font('Helvetica-Bold').text('Invoice Details:', 405, 355)
     .font('Helvetica').text(order.invoiceDetails.invoiceDetails, 466, 355)
     .font('Helvetica-Bold').text('Invoice Date:', 447, 370)
     .font('Helvetica').text(order.invoiceDetails.invoiceDate, 498, 370);

  // Table Header
  const tableTop = 500;
  const tableHeaders = [
    { title: 'Sl. No', position: 10 },
    { title: 'Description', position: 60 },
    { title: 'Unit Price', position: 250 },
    { title: 'Qty', position: 300 },
    { title: 'Net Amount', position: 325 },
    { title: 'Tax Rate', position: 375 },
    { title: 'Tax Type', position: 425 },
    { title: 'Tax Amount', position: 475 },
    { title: 'Total Amount', position: 550 },
  ];

  // Draw headers with grey background
  tableHeaders.forEach(header => {
    doc.rect(header.position - 5, tableTop - 5, 60, 15).fill('#E0E0E0');
  });

  // Draw headers text
  doc.fillColor('black').font('Helvetica-Bold');
  tableHeaders.forEach(header => {
    doc.text(header.title, header.position, tableTop);
  });

  // Draw horizontal line below header
  doc.moveTo(7, tableTop + 15).lineTo(605, tableTop + 15).stroke();

  // Reset color to black for table content
  doc.fillColor('black');

  // Table Rows
  let y = tableTop + 20;
  order.items.forEach((item, index) => {
    doc.font('Helvetica')
      .text(index + 1, 10, y)
      .text(item.description, 25, y)
      .text(Number(item.unitPrice).toFixed(2), 260, y)
      .text(Number(item.qty), 303, y)
      .text(Number(item.netAmount).toFixed(2), 340, y)
      .text(Number(item.taxRate).toFixed(2) + '%', 385, y)
      .text(item.taxType, 430, y)
      .text(Number(item.taxAmount).toFixed(2), 485, y)
      .text(Number(item.totalAmount).toFixed(2), 560, y);

    // Draw row border
    doc.moveTo(7, y + 20).lineTo(605, y + 20).stroke();
    doc.moveTo(7, y + 57).lineTo(605, y + 57).stroke();
   

    y += 24;
  });

  // Draw table borders
  doc.rect(7, tableTop - 10, 600, y - tableTop + 125).stroke();

  // Total Amount
  y += 1;
  doc.font('Helvetica-Bold').text('TOTAL:', 10, y)
    .font('Helvetica').text(Number(order.totalAmount).toFixed(2), 560, y);

  // Amount in Words
  y += 20;
  doc.fontSize(10).font('Helvetica-Bold').text('Amount in Words:', 20, y)
    .font('Helvetica-Bold').text(order.amountInWords, 130, y);

  // Authorised Signatory
  y += 20;
  doc.font('Helvetica-Bold').text(`For ${order.sellerDetails.name}:`, 400, y);

  if (fs.existsSync(SIGNATURE_PATH)) {
    doc.image(SIGNATURE_PATH, 400, y + 10, { width: 130 });
  }

  doc.font('Helvetica-Bold').text('Authorised Signatory', 400, y + 63);
}

module.exports = generateInvoice;

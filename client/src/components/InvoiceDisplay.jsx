import React, { useState, useEffect } from 'react';
import { Box, List, Text } from 'grommet';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices/create-invoice')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Box width="large" margin={{ top: 'medium' }}>
      <Text size="large" weight="bold">Invoices</Text>
      <List
        data={invoices}
        primaryKey="invoiceDetails.invoiceNo"
        secondaryKey="orderDetails.orderNo"
      />
    </Box>
  );
};

export default InvoiceList;

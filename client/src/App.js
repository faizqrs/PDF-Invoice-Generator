import React from 'react';
import { Box, Heading } from 'grommet';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceDisplay';

const App = () => {
  return (
    <Box align="center" pad="large">
      <Heading level="2">Invoice Generator</Heading>
      <InvoiceForm />
      <InvoiceList />
    </Box>
  );
};

export default App;

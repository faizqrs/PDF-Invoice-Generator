import React, { useState } from 'react';
import { Box, Button, Form, FormField, TextInput, TextArea } from 'grommet';
import axios from 'axios';

const InvoiceForm = () => {
  const [formValues, setFormValues] = useState({
    sellerDetails: {
      name: '',
      address: '',
      pan: '',
      gst: ''
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      stateCode: ''
    },
    shippingDetails: {
      name: '',
      address: '',
      stateCode: ''
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: ''
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDetails: '',
      invoiceDate: ''
    },
    items: [],
    totalAmount: 0,
    amountInWords: '',
  });

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleItemChange = (index, name, value) => {
    const newItems = [...formValues.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setFormValues({ ...formValues, items: newItems });
  };

  const addItem = () => {
    setFormValues({ ...formValues, items: [...formValues.items, { description: '', unitPrice: 0, qty: 0, netAmount: 0, taxRate: 0, taxType: '', taxAmount: 0, totalAmount: 0 }] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/invoices/create-invoice', formValues)
      .then(response => {
        console.log(response.data);
        alert('Invoice created successfully');
      })
      .catch(error => {
        console.error(error);
        alert('Error creating invoice');
      });
  };

  return (
    <Box width="medium">
      <Form onSubmit={handleSubmit}>
        <FormField name="sellerDetails.name" label="Seller Name" required>
          <TextInput name="sellerDetails.name" value={formValues.sellerDetails.name} onChange={event => handleChange('sellerDetails.name', event.target.value)} />
        </FormField>
        <FormField name="sellerDetails.address" label="Seller Address" required>
          <TextArea name="sellerDetails.address" value={formValues.sellerDetails.address} onChange={event => handleChange('sellerDetails.address', event.target.value)} />
        </FormField>
        <FormField name="sellerDetails.pan" label="PAN No." required>
          <TextInput name="sellerDetails.pan" value={formValues.sellerDetails.pan} onChange={event => handleChange('sellerDetails.pan', event.target.value)} />
        </FormField>
        <FormField name="sellerDetails.gst" label="GST Registration No." required>
          <TextInput name="sellerDetails.gst" value={formValues.sellerDetails.gst} onChange={event => handleChange('sellerDetails.gst', event.target.value)} />
        </FormField>
        <FormField name="placeOfSupply" label="Place of Supply" required>
          <TextInput name="placeOfSupply" value={formValues.placeOfSupply} onChange={event => handleChange('placeOfSupply', event.target.value)} />
        </FormField>
        <FormField name="billingDetails.name" label="Billing Name" required>
          <TextInput name="billingDetails.name" value={formValues.billingDetails.name} onChange={event => handleChange('billingDetails.name', event.target.value)} />
        </FormField>
        <FormField name="billingDetails.address" label="Billing Address" required>
          <TextArea name="billingDetails.address" value={formValues.billingDetails.address} onChange={event => handleChange('billingDetails.address', event.target.value)} />
        </FormField>
        <FormField name="billingDetails.stateCode" label="Billing State/UT Code" required>
          <TextInput name="billingDetails.stateCode" value={formValues.billingDetails.stateCode} onChange={event => handleChange('billingDetails.stateCode', event.target.value)} />
        </FormField>
        <FormField name="shippingDetails.name" label="Shipping Name" required>
          <TextInput name="shippingDetails.name" value={formValues.shippingDetails.name} onChange={event => handleChange('shippingDetails.name', event.target.value)} />
        </FormField>
        <FormField name="shippingDetails.address" label="Shipping Address" required>
          <TextArea name="shippingDetails.address" value={formValues.shippingDetails.address} onChange={event => handleChange('shippingDetails.address', event.target.value)} />
        </FormField>
        <FormField name="shippingDetails.stateCode" label="Shipping State/UT Code" required>
          <TextInput name="shippingDetails.stateCode" value={formValues.shippingDetails.stateCode} onChange={event => handleChange('shippingDetails.stateCode', event.target.value)} />
        </FormField>
        <FormField name="orderDetails.orderNo" label="Order Number" required>
          <TextInput name="orderDetails.orderNo" value={formValues.orderDetails.orderNo} onChange={event => handleChange('orderDetails.orderNo', event.target.value)} />
        </FormField>
        <FormField name="orderDetails.orderDate" label="Order Date" required>
          <TextInput name="orderDetails.orderDate" value={formValues.orderDetails.orderDate} onChange={event => handleChange('orderDetails.orderDate', event.target.value)} />
        </FormField>
        <FormField name="invoiceDetails.invoiceNo" label="Invoice Number" required>
          <TextInput name="invoiceDetails.invoiceNo" value={formValues.invoiceDetails.invoiceNo} onChange={event => handleChange('invoiceDetails.invoiceNo', event.target.value)} />
        </FormField>
        <FormField name="invoiceDetails.invoiceDetails" label="Invoice Details" required>
          <TextInput name="invoiceDetails.invoiceDetails" value={formValues.invoiceDetails.invoiceDetails} onChange={event => handleChange('invoiceDetails.invoiceDetails', event.target.value)} />
        </FormField>
        <FormField name="invoiceDetails.invoiceDate" label="Invoice Date" required>
          <TextInput name="invoiceDetails.invoiceDate" value={formValues.invoiceDetails.invoiceDate} onChange={event => handleChange('invoiceDetails.invoiceDate', event.target.value)} />
        </FormField>

        {/* Items */}
        <Box margin={{ vertical: 'small' }}>
          <Button label="Add Item" onClick={addItem} />
        </Box>
        {formValues.items.map((item, index) => (
          <Box key={index} margin={{ bottom: 'small' }}>
            <FormField name={`items[${index}].description`} label="Description" required>
              <TextInput name={`items[${index}].description`} value={item.description} onChange={event => handleItemChange(index, 'description', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].unitPrice`} label="Unit Price" required>
              <TextInput name={`items[${index}].unitPrice`} value={item.unitPrice} onChange={event => handleItemChange(index, 'unitPrice', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].qty`} label="Quantity" required>
              <TextInput name={`items[${index}].qty`} value={item.qty} onChange={event => handleItemChange(index, 'qty', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].netAmount`} label="Net Amount" required>
              <TextInput name={`items[${index}].netAmount`} value={item.netAmount} onChange={event => handleItemChange(index, 'netAmount', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].taxRate`} label="Tax Rate" required>
              <TextInput name={`items[${index}].taxRate`} value={item.taxRate} onChange={event => handleItemChange(index, 'taxRate', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].taxType`} label="Tax Type" required>
              <TextInput name={`items[${index}].taxType`} value={item.taxType} onChange={event => handleItemChange(index, 'taxType', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].taxAmount`} label="Tax Amount" required>
              <TextInput name={`items[${index}].taxAmount`} value={item.taxAmount} onChange={event => handleItemChange(index, 'taxAmount', event.target.value)} />
            </FormField>
            <FormField name={`items[${index}].totalAmount`} label="Total Amount" required>
              <TextInput name={`items[${index}].totalAmount`} value={item.totalAmount} onChange={event => handleItemChange(index, 'totalAmount', event.target.value)} />
            </FormField>
          </Box>
        ))}

        <FormField name="totalAmount" label="Total Amount" required>
          <TextInput name="totalAmount" value={formValues.totalAmount} onChange={event => handleChange('totalAmount', event.target.value)} />
        </FormField>
        <FormField name="amountInWords" label="Amount in Words" required>
          <TextInput name="amountInWords" value={formValues.amountInWords} onChange={event => handleChange('amountInWords', event.target.value)} />
        </FormField>

        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Generate Invoice" />
        </Box>
      </Form>
    </Box>
  );
};

export default InvoiceForm;

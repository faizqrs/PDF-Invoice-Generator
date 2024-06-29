import React from 'react';
import ReactDOM from 'react-dom/client';
import { Grommet } from 'grommet';
import App from './App';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Grommet theme={theme}>
    <App />
  </Grommet>
);

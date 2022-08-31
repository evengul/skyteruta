import React from 'react';
import ReactDOM from 'react-dom/client';
import './firebase';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThriftHaven } from './components/ThriftHaven';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThriftHaven />
  </BrowserRouter>
);

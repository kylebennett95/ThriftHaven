import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThriftHaven } from './components/ThriftHaven';
import { BrowserRouter } from 'react-router-dom';
import firebase from "firebase/compat/app"; // Import Firebase!!
import { firebaseConfig } from "./FirebaseConfig"; // Import Your Config!!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThriftHaven />
  </BrowserRouter>
);

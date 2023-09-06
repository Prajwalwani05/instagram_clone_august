import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TokenProvider from './context/TokenProvider';
// import ImageProvider from './context/ImageProvider';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <TokenProvider>
      {/* <ImageProvider> */}
        <App />
      {/* </ImageProvider> */}
     </TokenProvider>
  </BrowserRouter>
);

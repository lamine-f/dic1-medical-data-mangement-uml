import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ConnectionProvider} from "./_hooks/useConnection";
import {LoaderProvider} from "./components/Loader/useLoader";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ConnectionProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
      </ConnectionProvider>
  </React.StrictMode>
);


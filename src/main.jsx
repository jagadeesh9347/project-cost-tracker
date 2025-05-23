// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";

import store from './app/store'; // Assuming default export for store
import { Provider } from 'react-redux';

// *** NEW IMPORT for React Router ***
import { BrowserRouter } from 'react-router-dom';

// Optional: customize the theme if needed
const theme = extendTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your entire application in BrowserRouter */}
    <BrowserRouter> {/* <--- ADDED THIS LINE */}
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter> {/* <--- ADDED THIS LINE */}
  </React.StrictMode>
);
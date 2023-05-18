import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home.js';
import { dict } from './language.js';
import { addInitListener, addContextUpdateListener, removeContextUpdateListener, removeInitListener, uxManager} from '@luigi-project/client';
import { ThemeProvider } from "@ui5/webcomponents-react";
import Products from './views/products.js';
import ProductDetail from './views/productDetail.js';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  const [currentLocale, setCurrentLocale] = useState('en-US');
  const [initListener, setInitListener] = useState(null);
  const [contextUpdateListener, setContextUpdateListener] = useState(null);

  useEffect(() => {
    const updateCurrentLanguage = () => {
      setCurrentLocale(uxManager().getCurrentLocale())
    }

    setInitListener(
      addInitListener(() => {
        console.log("Luigi Client initialized.");
        // update current language upon Luigi Client initialization
        updateCurrentLanguage();
      })
    );

    setContextUpdateListener(
      addContextUpdateListener(() => {
        // update current language upon Luigi Client context update event
        updateCurrentLanguage();
      })
    );

    return function cleanup() {
      removeContextUpdateListener(contextUpdateListener);
      removeInitListener(initListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <React.StrictMode>
        <Router basename="microfrontend">
          <Routes>
            <Route path="/products" element={<Products localeDict={dict[currentLocale]}/>}></Route>
            <Route path="/productDetail/:id" element={<ProductDetail localeDict={dict[currentLocale]} />}></Route>
          </Routes>
        </Router>
      </React.StrictMode>
    </ThemeProvider>
  );
};

root.render(<App />);

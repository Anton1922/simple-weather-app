import React from 'react';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Header from './components/Header/Header.js'; 
import Body from './components/Body/Body.js'

import './App.scss';

function App() {
  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <Header />
        <Body />
      </AppProvider>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Header from './components/Header/Header.js'; 
import Body from './components/Body/Body.js'

import './App.scss';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [iconUrl, setIconUrl] = useState('');
  const [coords, setCoords] = useState({});

  const url = 
  `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&APPID=284cc29c8886800aa3961c2c7c1899de`;
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({ lon: position.coords.longitude, lat: position.coords.latitude });
      });
    }
  }, []);

  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      try {
        const res = await superagent.get(url);
        
        const { main, name, sys, weather, coord } = res.body;
        const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        setIconUrl(icon);
  
        setCurrentWeather({ main, name, sys, weather, coord });
      } catch (err) {
        
      }
    };
   
    getCurrentLocationWeather();
  }, [coords, url]);
  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <Header setCoords={setCoords} setIconUrl={setIconUrl} setCurrentWeather={setCurrentWeather} />
        <Body iconUrl={iconUrl} currentWeather={currentWeather} />
      </AppProvider>
    </div>
  );
}

export default App;

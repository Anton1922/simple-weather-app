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
  console.log('coords', coords);

  const url = 
  `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=284cc29c8886800aa3961c2c7c1899de`;
  
  useEffect(() => {
    console.log(navigator.geolocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude);
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude});
      });
    }
  }, []);

  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      try {
        const res = await superagent.get(url);
        console.log('OWM response', res.body);
        
        const { main, name, sys, weather } = res.body;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        setIconUrl(icon);
        console.log(res.body);
  
        setCurrentWeather({ main, name, sys, weather });
      } catch (err) {
        console.log('err', err);
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

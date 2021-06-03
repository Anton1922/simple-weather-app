import React, { useCallback, useState } from 'react';
import superagent from 'superagent';

import { Form, TextField, Button } from '@shopify/polaris';

import './Header.scss';

const Header = ({ setCoords, setIconUrl, setCurrentWeather }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const url = 
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=284cc29c8886800aa3961c2c7c1899de`;

  const handleCityChange = useCallback((value) => setCity(value), []);

  const getWeather = useCallback(() => {
    setLoading(true);
    const requestWeather = async () => {
      try {
        const res = await superagent.get(url);
        
        const { main, name, sys, weather, coord } = res.body;
        const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        setIconUrl(icon);
  
        setCurrentWeather({ main, name, sys, weather, coord });

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
   
    requestWeather();
  }, [url, setIconUrl, setCurrentWeather]);

  const handleSubmit = useCallback((event) => {
    getWeather();
    setCity('');
  }, [getWeather]);

  const handleClickCurrentLocation = useCallback((event) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude});
      });
    }
  }, [setCoords]);

  return (
    <div className="header">
      <Form noValidate onSubmit={handleSubmit}>
        <TextField
          value={city}
          onChange={handleCityChange}
          type="text"
        />
        <Button loading={loading} submit>Show weather</Button>
      </Form>
      <Button onClick={handleClickCurrentLocation} primary>Show current location weather</Button>
    </div>
  );
};

export default Header;

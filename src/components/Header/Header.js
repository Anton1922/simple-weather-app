import React, { useCallback, useState } from 'react';
import superagent from 'superagent';

import { Form, TextField, Button } from '@shopify/polaris';

import './Header.scss';

const Header = ({ setCoords, setIconUrl, setCurrentWeather }) => {
  const [city, setCity] = useState('');
  console.log('city', city);

  const url = 
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=284cc29c8886800aa3961c2c7c1899de`;

  const handleCityChange = useCallback((value) => setCity(value), []);

  const getWeather = useCallback(() => {
    const requestWeather = async () => {
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
   
    requestWeather();
  }, [url, setIconUrl, setCurrentWeather]);

  const handleSubmit = useCallback((event) => {
    console.log('event', event);
    console.log('value', event.target[0].value);
    getWeather();
    setCity('');
  }, [getWeather]);

  const handleSubmitCurrentLocation = useCallback((event) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude);
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
        <Button submit>show</Button>
      </Form>
      <Form noValidate onSubmit={handleSubmitCurrentLocation}>
        <Button submit>show current location weather</Button>
      </Form>
    </div>
  );
};

export default Header;

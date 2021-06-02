import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

import { Heading } from '@shopify/polaris';

import WeatherInfo from '../WeatherInfo/WeatherInfo.js';

import './Body.scss';

const Body = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [iconUrl, setIconUrl] = useState('');
  const [coords, setCoords] = useState({ lat: 55.754751999999996, lon: 37.6111104});
  console.log('coords', coords);
  
  useEffect(() => {
    console.log(navigator.geolocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude);
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude});
      });
    }
  }, []);

  useEffect(async () => {
    console.log('coords', coords);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=284cc29c8886800aa3961c2c7c1899de`
    
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
  }, [coords]);

  return (
    <div className="body">
      <Heading className="body-header" element="h1">Weather in your city</Heading>
      <WeatherInfo weatherData={currentWeather} icon={iconUrl}/>
    </div>
  );
};

export default Body;

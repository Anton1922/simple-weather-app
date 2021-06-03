import React from 'react';

import { Heading } from '@shopify/polaris';

import WeatherInfo from '../WeatherInfo/WeatherInfo.js';
import FavoriteCities from '../FavoriteCities/FavoriteCities.js';

import './Body.scss';

const Body = ({ iconUrl, currentWeather }) => {
  
  return (
    <div className="body">
      <Heading className="body-header" element="h1">Weather in your city</Heading>
      <WeatherInfo weatherData={currentWeather} icon={iconUrl}/>
      <FavoriteCities />  
    </div>
  );
};

export default Body;

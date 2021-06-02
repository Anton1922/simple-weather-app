import React from 'react';

import { Card, Heading, DisplayText } from '@shopify/polaris';

import './WeatherInfo.scss';

const WeatherInfo = ({ weatherData, icon }) => {
  console.log('weatherData', weatherData);
  const { main, name, sys, weather } = weatherData;
  const iconUrl = icon;
  console.log('icon', icon);

  return (
    <Card className="weather-card">
      <Heading element="h3" className="">
        {name}
        <span>, {sys && sys.country}</span>
      </Heading>
      <DisplayText size="large">{main && Math.round(main.temp)} °C</DisplayText>
      <div className="weather-info__container-image">
        <img src={iconUrl} alt="weather icon"/>
      </div>

      <DisplayText size="medium">{weather && weather[0].description}</DisplayText>
    </Card>
  );
};

export default WeatherInfo;

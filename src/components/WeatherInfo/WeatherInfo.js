import React, { useCallback } from 'react';

import { Card, Heading, DisplayText, Button } from '@shopify/polaris';

import './WeatherInfo.scss';

const WeatherInfo = ({ weatherData, icon }) => {
  const { main, name, sys, weather, coord } = weatherData;
  const iconUrl = icon;

  const handleClickAddoFavorites = useCallback(() => {
    localStorage.setItem(name, JSON.stringify({
      name,
      lon: coord.lon,
      lat: coord.lat,
    }));
  }, [name, coord]);

  return (
    <Card className="weather-card">
      <Heading element="h3">
        {name}
        <span>, {sys && sys.country}</span>
      </Heading>
      
      <DisplayText size="large">{main && Math.round(main.temp)} °C</DisplayText>
      <div className="weather-info__container-image">
        <img src={iconUrl} alt="weather icon"/>
      </div>

      <DisplayText size="medium">{weather && weather[0].description}</DisplayText>

      <Button onClick={handleClickAddoFavorites} outline>Add to favorites</Button>
    </Card>
  );
};

export default WeatherInfo;

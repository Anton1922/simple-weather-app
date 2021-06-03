import React from 'react';

import { Thumbnail, Heading, DisplayText } from '@shopify/polaris';

import './FavoriteCity.scss';

const FavoriteCity = ({ name, country, temp, description, icon }) => {

  return (
    <div className="favorite-city">
      <Heading element="h5">
        {name}
        <span>, {country}</span>
      </Heading>

      <DisplayText size="small">{Math.round(temp)} °C</DisplayText>

      <Thumbnail
        source={icon}
        alt="weather icon"
        size="large"
      />

      <DisplayText size="small">{description}</DisplayText>
    </div>
  );
};

export default FavoriteCity;
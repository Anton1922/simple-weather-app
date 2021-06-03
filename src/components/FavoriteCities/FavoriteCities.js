import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

import { Card, Heading } from '@shopify/polaris';

import FavoriteCity from '../FavoriteCity/FavoriteCity.js';

import './FavoriteCities.scss';

const FavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    if (localStorage.length) {
      const newFavoritesCities = [...favoriteCities];
      
      for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue;
        }
        const favoriteCity = JSON.parse(localStorage.getItem(key));
  
        const url = 
          `https://api.openweathermap.org/data/2.5/weather?lat=${favoriteCity.lat}&lon=${favoriteCity.lon}&units=metric&APPID=284cc29c8886800aa3961c2c7c1899de`;
    
        
        const getFavoriteCityWeather = async () => {
          try {
            const res = await superagent.get(url);
            const { main, name, sys, weather, coord } = res.body;
            const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            
            newFavoritesCities.push({ temp: main.temp, name, country: sys.country, description: weather.description, coord, icon});
          } catch (err) {
          }
        };
        getFavoriteCityWeather();

        setFavoriteCities(newFavoritesCities);
      }
    }
  }, [setFavoriteCities]);

  return (
    <Card>
      <Heading className="favorite-cities__header" element="h2">Favorite cities</Heading>
      <div className="favorite-cities">
        {favoriteCities.map((city, index) => {
          return (
            <FavoriteCity 
              name={city.name} 
              country={city.country} 
              temp={city.temp} 
              description={city.description}
              icon={city.icon}
              key={index}
            />
            );
        })}
      </div>
    </Card>
  );
};

export default FavoriteCities;

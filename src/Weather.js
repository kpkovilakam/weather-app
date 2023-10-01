// Weather.js
import React, { useState } from 'react';
import axios from 'axios';  
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSearched(false);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6194ebd1de03ebcb25205dcfbbde7649`
      );
      const temperatureInCelsius = (response.data.main.temp - 273.15).toFixed(1);    
  
      setWeather({
        ...response.data,
        main: {
          ...response.data.main,
          temp: temperatureInCelsius,
        },
      });
      setSearched(true);
    } 
    
    catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setSearched(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={getWeather}>Get Weather</button>

      {searched && weather ? (
  <div>
    <h3>Weather in {capitalizeFirstLetter(city)}</h3>
    <p>Temperature: {weather.main.temp} &deg;C</p>
    <p>Condition: {capitalizeFirstLetter(weather.weather[0].description)}</p>
  </div>
) : searched && !weather ? (
    <p>Oops! The weather report for your city seems to be on vacation🙈.<br />How about exploring the forecast in a different city?</p>
  ) : null
}
    <div style={{ marginTop: '20px' }}>
        <p>Build with <span style={{ color: 'red' }}>&hearts;</span> by <a href="https://kpkovilakam.github.io/personal-portfolio/" target="_blank" rel="noopener noreferrer">KP</a></p>
    </div>
    </div>
  );
};

export default Weather;

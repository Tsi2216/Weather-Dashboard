import React from 'react';

const WeatherCard = ({ weather }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white max-w-sm mx-auto flex flex-col">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <p className="text-gray-700">Temperature: {weather.main.temp} °C</p>
      <p className="text-gray-700">Humidity: {weather.main.humidity}%</p>
      <p className="text-gray-700">Wind Speed: {weather.wind.speed} km/h</p>
      <p className="text-gray-500 italic">{weather.weather.description}</p>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather.icon}.png`} 
        alt={weather.weather.description} 
        className="mt-2 w-24 h-24 md:w-32 md:h-32 mx-auto"
      />
    </div>
  );
};

export default WeatherCard;
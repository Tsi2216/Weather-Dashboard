// WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ currentWeather, forecast }) => {
    return (
        <div className="weather-card">
            <h2>{currentWeather.city}</h2>
            <p>Temperature: {currentWeather.temperature}°C</p>
            <p>Condition: {currentWeather.condition}</p>
            <h3>Forecast</h3>
            <ul>
                {forecast.map((day, index) => (
                    <li key={index}>
                        {day.date}: {day.temperature}°C, {day.condition}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherCard;
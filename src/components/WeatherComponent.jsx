// src/components/WeatherComponent.jsx
import React, { useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi'; 

const WeatherComponent = () => {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!city) {
            setError('Please enter a city name');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const weatherData = await fetchWeatherData(city);
            setCurrentWeather(weatherData.current);
            setForecast(weatherData.forecast);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name" 
            />
            <button onClick={handleSearch}>Search</button>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {currentWeather && (
                <div>
                    <h2>Current Weather in {city}</h2>
                    <p>Temperature: {currentWeather.temperature}°C</p>
                    <p>Condition: {currentWeather.condition}</p>
                </div>
            )}

            {forecast.length > 0 && (
                <div>
                    <h2>Forecast</h2>
                    <ul>
                        {forecast.map((day, index) => (
                            <li key={index}>
                                {day.date}: {day.temperature}°C, {day.condition}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
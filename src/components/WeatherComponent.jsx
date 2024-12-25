import React, { useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi'; 
import SearchBar from './SearchBar'; 

const WeatherComponent = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (city) => {
        if (!city) {
            return; // No need for error handling here; handled in SearchBar
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
            <SearchBar onSearch={handleSearch} /> {/* Pass search function to SearchBar */}

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {currentWeather && (
                <div>
                    <h2>Current Weather</h2>
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
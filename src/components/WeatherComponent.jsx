// src/components/WeatherComponent.jsx
import React, { useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi'; 
import WeatherCard from './WeatherCard'; 
import WeeklyForecast from './WeeklyForecast'; 

const WeatherComponent = () => {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const data = await fetchWeatherData(city); // Fetch weather data using the city name
            setCurrentWeather(data.currentWeather); 
            setForecast(data.forecast); 
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
            setCity(''); // Clear the input field after search
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Search'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {currentWeather && <WeatherCard weather={currentWeather} />}
            {forecast.length > 0 && <WeeklyForecast forecast={forecast} />}
        </div>
    );
};

export default WeatherComponent; 
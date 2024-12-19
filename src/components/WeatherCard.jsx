import React, { useState } from 'react';
import fetchWeatherData from '../services/weatherApi'; // Adjust the path as needed
import WeatherCard from './WeatherCard'; // Adjust the path as needed

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
            const { currentWeather, forecast } = await fetchWeatherData(city);
            setCurrentWeather(currentWeather);
            setForecast(forecast);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setCity('');
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
            {error && <p className="error">{error}</p>}
            {currentWeather && forecast.length > 0 && (
                <WeatherCard currentWeather={currentWeather} forecast={forecast} />
            )}
        </div>
    );
};

export default WeatherComponent;
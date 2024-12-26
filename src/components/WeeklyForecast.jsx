import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi'; // Ensure this matches your export

const WeeklyForecast = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData(`${lat},${lon}`); // Use lat and lon for fetching
                setWeather(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getWeather();
    }, [lat, lon]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weekly Forecast for {weather.name}</h1>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather.description}</p> {/* Access the first element of the weather array */}
            {/* Add more weather details as needed */}
        </div>
    );
};

export default WeeklyForecast;
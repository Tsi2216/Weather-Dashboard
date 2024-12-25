// src/components/WeeklyForecast.jsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi'; 

const WeeklyForecast = ({ lat, lon }) => {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const getForecast = async () => {
            try {
                const data = await fetchWeatherData(lat, lon); 
                setForecast(data.forecast);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
            }
        };
        getForecast();
    }, [lat, lon]);

    return (
        <div>
            <h2 className="text-xl font-bold">Weekly Forecast</h2>
            <ul>
                {forecast.map((day, index) => (
                    <li key={index}>
                        <p>Day {index + 1}: High {day.high} °C, Low {day.low} °C</p> 
                        <p>Condition: {day.weather}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeeklyForecast;
// src/components/WeeklyForecast.jsx
import React, { useEffect, useState } from 'react';
import { fetchWeeklyForecast } from '../weatherApi'; // Adjust the import based on where you placed the function

const WeeklyForecast = ({ lat, lon }) => {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const getForecast = async () => {
            const data = await fetchWeeklyForecast(lat, lon);
            setForecast(data);
        };
        getForecast();
    }, [lat, lon]);

    return (
        <div>
            <h2 className="text-xl font-bold">Weekly Forecast</h2>
            <ul>
                {forecast.map((day, index) => (
                    <li key={index}>
                        <p>Day {index + 1}: High {day.temp.max} °C, Low {day.temp.min} °C</p>
                        <p>Condition: {day.weather.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeeklyForecast;
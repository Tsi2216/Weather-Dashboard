import React, { useState } from 'react';
import fetchWeatherData from './services/weatherApi'; 
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeeklyForecast from './components/WeeklyForecast'; 
import LanguageSelector from './components/LanguageSelector'; 
import WeatherComponent from './components/WeatherComponent'; 

const App = () => {
  const [theme, setTheme] = useState('light');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(''); // State for the city name

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Fetch weather data when the city changes
  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWeatherData(city);
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [city]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`container mx-auto p-4 md:p-8 lg:p-12 ${theme}`}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Weather Dashboard</h1>
      <button onClick={toggleTheme} className="mb-4 p-2 bg-gray-200 rounded">Toggle Theme</button>
      <SearchBar setCity={setCity} /> {/* Pass setCity to SearchBar */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && <WeatherComponent data={weatherData} />} {/* Pass weather data to WeatherComponent */}
      <WeeklyForecast data={weatherData?.forecast} /> {/* Pass forecast data if available */}
    </div>
  );
};

export default App;
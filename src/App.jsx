// App.jsx
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeeklyForecast from './components/WeeklyForecast'; 
import LanguageSelector from './components/LanguageSelector'; 
import WeatherComponent from './components/WeatherComponent'; // Import WeatherComponent

const App = () => {
  const [theme, setTheme] = useState('light'); 

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`container mx-auto p-4 md:p-8 lg:p-12 ${theme}`}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Weather Dashboard</h1>
      <button onClick={toggleTheme} className="mb-4 p-2 bg-gray-200 rounded">Toggle Theme</button>
      <WeatherComponent /> {/* Include WeatherComponent here */}
    </div>
  );
};

export default App;
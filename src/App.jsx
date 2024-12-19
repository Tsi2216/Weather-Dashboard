import React, { useState, useEffect } from 'react';
import fetchWeatherData from './services/weatherApi'; 
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeeklyForecast from './components/WeeklyForecast'; 
import LanguageSelector from './components/LanguageSelector'; 

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); 
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
          setTheme(savedTheme);
      }
      getLocation(); 
  }, []);

  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
  };

  const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoords(latitude, longitude); // Fetch weather data using coordinates
      }, (error) => {
          setError('Unable to retrieve your location. Please try again.');
          console.error(error);
      });
  };

  const fetchWeatherDataByCoords = async (latitude, longitude) => {
      setIsLoading(true);
      try {
          const data = await fetchWeatherData({ latitude, longitude }, language); // Pass the selected language
          setWeather(data.currentWeather); 
          setForecast(data.forecast); 
      } catch (err) {
          setError('Failed to fetch weather data. Please try again.');
      } finally {
          setIsLoading(false);
      }
  };

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchWeatherData(city, language); // Pass the selected language
      setWeather(data.currentWeather); 
      setForecast(data.forecast); 
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
      // Optionally, you can fetch weather data again when the language changes
  };

  return (
    <div className={`container mx-auto p-4 md:p-8 lg:p-12 ${theme}`}>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Weather Dashboard</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} />
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <WeeklyForecast forecast={forecast} />} {/* Display the weekly forecast */}
    </div>
  );
};

export default App;
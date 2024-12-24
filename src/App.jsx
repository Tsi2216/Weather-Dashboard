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

  useEffect(() => {
      // Fetch weather data again when the language changes
      if (weather) {
          getLocation(); // Or use default city like 'London'
      }
  }, [language]);

  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
  };

  const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeatherDataByCoords(latitude, longitude); // Fetch weather data using coordinates
          }, 
          (error) => {
              setError('Unable to retrieve your location. Please try again.');
              console.error('Geolocation error:', error);
              // Optionally, you can call fetchWeatherDataByCoords with hardcoded values for testing
              // fetchWeatherDataByCoords(51.5074, -0.1278); // Example: London coordinates
          }
      );
  };

  const fetchWeatherDataByCoords = async (latitude, longitude) => {
      setIsLoading(true);
      try {
          console.log('Fetching weather data for:', { latitude, longitude });
          const data = await fetchWeatherData({ latitude, longitude }, language); // Pass the selected language
          setWeather(data.currentWeather); 
          setForecast(data.forecast); 
      } catch (err) {
          setError('Failed to fetch weather data. Please try again.');
          console.error('Fetch error:', err);
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
      console.log('Searching for city:', city);
      const data = await fetchWeatherData(city, language); // Pass the selected language
      setWeather(data.currentWeather); 
      setForecast(data.forecast); 
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (event) => {
      const newLanguage = event.target.value;
      setLanguage(newLanguage);
      setIsLoading(true);
      try {
          console.log('Changing language to:', newLanguage);
          // Optionally, you can fetch weather data again here or in a useEffect
          const data = await fetchWeatherData(weather.city, newLanguage); // Use current city from weather state
          setWeather(data.currentWeather); 
          setForecast(data.forecast); 
      } catch (err) {
          setError('Failed to fetch weather data. Please try again.');
          console.error('Fetch error:', err);
      } finally {
          setIsLoading(false);
      }
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
// src/services/weatherApi.js

const fetchWeatherData = async (city, lang = 'en') => {
  const apiKey = '824a09abc61a18f2313f3cfa41584f10';

  try {
    // Fetch current weather data to get latitude and longitude
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${lang}`);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`City not found: ${errorResponse.message}`);
    }
    
    const currentWeather = await response.json();
    
    // Extract latitude and longitude
    const { lat, lon } = currentWeather.coord;

    // Fetch 7-day weather forecast using latitude and longitude
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=${lang}`);
    
    if (!forecastResponse.ok) {
      const errorResponse = await forecastResponse.json();
      throw new Error(`Failed to fetch forecast data: ${errorResponse.message}`);
    }
    
    const forecastData = await forecastResponse.json();
    
    // Format the forecast data
    const dailyForecast = forecastData.daily.map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(lang), // Format date based on language
      high: day.temp.max,
      low: day.temp.min,
      weather: day.weather.description,
      icon: day.weather.icon, // Get icon for weather
    }));

    // Return both current weather and formatted 7-day forecast
    return {
      currentWeather,
      forecast: dailyForecast,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

export default fetchWeatherData; 
const cache = {};

const fetchWeatherData = async (city, lang = 'en') => {
  const apiKey = '80739f1d3215b28b19f3c4bdbc4c9bbd';

  // Check if data is already cached
  if (cache[city]) {
    return cache[city];
  }

  try {
    // Fetch current weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${lang}`);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`City not found: ${errorResponse.message}`);
    }
    
    const currentWeather = await response.json();
    const { lat, lon } = currentWeather.coord;

    // Fetch 7-day weather forecast
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=${lang}`);
    
    if (!forecastResponse.ok) {
      const errorResponse = await forecastResponse.json();
      throw new Error(`Failed to fetch forecast data: ${errorResponse.message}`);
    }
    
    const forecastData = await forecastResponse.json();
    const dailyForecast = forecastData.daily.map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(lang),
      high: day.temp.max,
      low: day.temp.min,
      weather: day.weather.description,
      icon: day.weather.icon,
    }));

    // Cache the result
    cache[city] = { currentWeather, forecast: dailyForecast };

    return {
      currentWeather,
      forecast: dailyForecast,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};
const fetchWeatherData = async (city, lang = 'en') => {
  const apiKey = '016ee4a96e66c03351212404a2cf1b91';
  
  // Fetch current weather data to get latitude and longitude
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`);
  
  if (!response.ok) throw new Error('City not found');
  
  const currentWeather = await response.json();
  
  // Extract latitude and longitude
  const { lat, lon } = currentWeather.coord;

  // Fetch 7-day weather forecast using latitude and longitude
  const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=${lang}`);
  
  if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');

  const forecastData = await forecastResponse.json();
  
  // Format the forecast data
  const dailyForecast = forecastData.daily.map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(), // Format date
      high: day.temp.max,
      low: day.temp.min,
      weather: day.weather[0].description, // Accessing the description correctly
  }));

  // Return both current weather and formatted 7-day forecast
  return {
      currentWeather,
      forecast: dailyForecast,
  };
};

export default fetchWeatherData;
const fetchWeatherData = async (city, lang = 'en') => {
  const apiKey = '824a09abc61a18f2313f3cfa41584f10';

  try {
    // Fetch current weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${lang}`);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`City not found: ${errorResponse.message}`);
    }
    
    const currentWeather = await response.json();
    
    // Extract needed data
    const weatherData = {
      temperature: currentWeather.main.temp,
      humidity: currentWeather.main.humidity,
      windSpeed: currentWeather.wind.speed,
      weatherCondition: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon, // Get icon for weather
    };

    // Return only current weather data
    return weatherData;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

export default fetchWeatherData;
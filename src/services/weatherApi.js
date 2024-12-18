// src/weatherApi.js

const fetchWeatherData = async (city) => {
    const apiKey = '80739f1d3215b28b19f3c4bdbc4c9bbd'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    return await response.json();
  };
  
  export default fetchWeatherData;
// src/services/weatherApi.js
export const fetchWeatherData = async (city) => {
    const apiKey = '824a09abc61a18f2313f3cfa41584f10'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('City not found or API request failed');
    }
    const data = await response.json();
    return data; // Return the fetched data
};
// weatherApi.js

const apiKey = '824a09abc61a18f2313f3cfa41584f10'; // Your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data for a given city.
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<object>} - A promise that resolves to the weather data.
 */
export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found or API request failed');
        }

        const data = await response.json();
        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weatherCondition: data.weather.description, // Fixed to access the first weather condition
            icon: data.weather.icon, // Fixed to access the first weather icon
            cityName: data.name,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
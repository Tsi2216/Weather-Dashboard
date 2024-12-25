const apiKey = '824a09abc61a18f2313f3cfa41584f10'; // Your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data for a given city.
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<object>} - A promise that resolves to the weather data.
 */
export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&random=${Date.now()}`);
        
        if (!response.ok) {
            throw new Error('City not found or API request failed');
        }

        const data = await response.json();

        // Structure the data to match the expected format
        return {
            currentWeather: {
                city: data.name,
                temperature: data.main.temp,
                condition: data.weather.description, // Access the first weather condition
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather.icon, // Access the first weather icon
            },
            forecast: [
                // You can add logic here to fetch or simulate forecast data
                { date: '2024-12-26', temperature: 26, condition: 'Partly Cloudy' },
                { date: '2024-12-27', temperature: 24, condition: 'Rainy' },
                { date: '2024-12-28', temperature: 22, condition: 'Sunny' },
            ],
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
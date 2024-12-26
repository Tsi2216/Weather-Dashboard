const apiKey = '824a09abc61a18f2313f3cfa41584f10'; // Your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall';

export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            const errorMessage = await response.json(); // Get the error message from the response
            throw new Error(`City not found or API request failed: ${errorMessage.message}`);
        }

        const data = await response.json();
        const { lat, lon } = data.coord;

        const forecastResponse = await fetch(`${forecastApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        
        if (!forecastResponse.ok) {
            const errorMessage = await forecastResponse.json(); // Get the error message from the response
            throw new Error(`Forecast data request failed: ${errorMessage.message}`);
        }

        const forecastData = await forecastResponse.json();

        return {
            currentWeather: {
                city: data.name,
                temperature: data.main.temp,
                condition: data.weather.description, // Access the first weather condition
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather.icon, // Access the first weather icon
            },
            forecast: forecastData.daily.map(day => ({
                date: new Date(day.dt * 1000).toISOString().split('T'), // Format date to YYYY-MM-DD
                temperature: day.temp.day,
                condition: day.weather.description, // Access the first weather condition
            })),
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
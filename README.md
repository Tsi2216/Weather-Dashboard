# Weather Dashboard

## Project Overview
The Weather Dashboard is a web application designed to provide users with current weather conditions for various cities around the world. Built using React JS and styled with Tailwind CSS, this application fetches data from the OpenWeatherMap API, allowing users to easily search for and view weather information.

## Features
- **Weather Data Fetching**: 
  - Fetch current weather data from OpenWeatherMap.
  - Display temperature, humidity, wind speed, and weather condition icons.
  
- **City Search Functionality**: 
  - Users can input city names to retrieve weather data.
  - Handle invalid city names with user-friendly error messages.
  
- **Responsive UI Design**: 
  - Utilizes Tailwind CSS for a responsive design that adapts to various screen sizes.
  
- **Real-Time Weather Updates**: 
  - Automatically refresh weather data every few minutes.
  - Option to manually refresh the data.
  
- **Error Handling**: 
  - Proper error handling for network issues and invalid API responses.

## Technical Requirements
- **Project Setup**: 
  - Set up a React project using Vite.
  - Integrate Tailwind CSS for styling.
  
- **API Integration**: 
  - Sign up for an API key from OpenWeatherMap.
  - Use fetch or axios for API requests.
  
- **User Interface Components**: 
  - Create reusable components: `SearchBar`, `WeatherCard`, and `ErrorMessage`.
  
- **State Management**: 
  - Use React hooks (`useState` and `useEffect`) for managing state and side effects.
  
- **Deployment**: 
  - Deploy the application on Netlify or Vercel. For deployment instructions, refer to the respective documentation.

## Getting Started
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tsi2216/Weather-Dashboard.git
   cd weather-dashboard
Install dependencies:
bash

npm install
Start the development server:
bash

npm run dev
Open your browser and navigate to http://localhost:5173.
Usage
Enter the name of a city in the search bar and press Enter or click the search button to retrieve the weather data.
The dashboard will display the current temperature, humidity, wind speed, and an icon representing the weather conditions.
If an invalid city name is entered, a user-friendly error message will be displayed.
Stretch Goals (Optional)
Implement local storage for recent searches.
Add a 7-day weather forecast feature.
Include a light/dark mode toggle.
Use the Geolocation API for automatic location detection.
Support multiple languages for internationalization.
Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements. When contributing, please follow the coding standards and practices outlined in the project.

License
This project is licensed under the MIT License. For more details, please refer to the LICENSE file in the repository.

Acknowledgments
OpenWeatherMap for providing the weather data API.
Tailwind CSS for the styling framework.
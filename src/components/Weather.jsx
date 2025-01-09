import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import './Weather.css';
import search_icon from '../assets/icons/search.png';
import sidebar_icon from '../assets/icons/sidebar.png';
import sun_icon from '../assets/icons/sun.png';
import cloudy_icon from '../assets/icons/cloudy.png';
import drizzle_icon from '../assets/icons/drizzle.png';
import rain_icon from '../assets/icons/rain.png';
import snow_icon from '../assets/icons/snow.png';
import wind_icon from '../assets/icons/wind.png';
import humidity_icon from '../assets/icons/humidity.png';
import favorite_icon from '../assets/icons/favorite.png';
import favorite_icon_filled from '../assets/icons/favorite_filled.png';
import defaultBackground from '../assets/images/snow.png';
import clearBackground from '../assets/images/clear.png'; 
import cloudyBackground from '../assets/images/cloudy.png'; 
import rainyBackground from '../assets/images/rainy.png'; 
import snowyBackground from '../assets/images/snow.png'; 
import sidebarBackground from '../assets/images/sidebar.png'; 

// SearchBar Component
const SearchBar = ({ search, inputRef, handleLanguageChange, selectedLanguage, supportedLanguages }) => (
    <div className="search-bar">
        <input 
            ref={inputRef} 
            type="text" 
            placeholder='Search for a city...' 
            aria-label="Search for a city" 
        />
        <img 
            src={search_icon} 
            alt="Search" 
            onClick={() => search(inputRef.current.value)} 
            role="button" 
            aria-label="Search button" 
        />
        <div className="language-selector">
            <select 
                value={selectedLanguage} 
                onChange={handleLanguageChange} 
                aria-label="Select language"
            >
                {Object.entries(supportedLanguages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
    </div>
);

SearchBar.propTypes = {
    search: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
    handleLanguageChange: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    supportedLanguages: PropTypes.object.isRequired,
};

// WeatherCard Component
const WeatherCard = ({ weatherData, isFavorite, toggleFavorite, handleRefresh, translations, selectedLanguage }) => (
    <>
        <img src={weatherData.icon} alt="Weather Icon" className='weather_icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <img 
            src={isFavorite ? favorite_icon_filled : favorite_icon} 
            alt="Favorite" 
            className="favorite-icon" 
            onClick={toggleFavorite} 
            style={{ cursor: 'pointer', marginLeft: '10px' }} 
        />
        <button 
            onClick={handleRefresh} 
            aria-label={translations[selectedLanguage].refresh}
        >
            {translations[selectedLanguage].refresh}
        </button>
        <div className='weather_data'>
            <div className='col'>
                <img src={humidity_icon} alt="Humidity" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>{translations[selectedLanguage].humidity}</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="Wind Speed" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>{translations[selectedLanguage].windSpeed}</span>
                </div>
            </div>
        </div>
    </>
);

WeatherCard.propTypes = {
    weatherData: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    translations: PropTypes.object.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
};

// ErrorMessage Component
const ErrorMessage = ({ errorMessage }) => (
    errorMessage && <p className="error-message" aria-live="assertive">{errorMessage}</p>
);

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string,
};

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [favoriteLocations, setFavoriteLocations] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showForecast, setShowForecast] = useState(false);
    const [forecastTextColor, setForecastTextColor] = useState('#fff');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isFavorite, setIsFavorite] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(defaultBackground); 

    // All weather icons mapping
    const allIcons = {
        "01d": sun_icon,
        "01n": sun_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    // Supported languages
    const supportedLanguages = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        pt: "Portuguese",
        ru: "Russian",
        ar: "Arabic",
        hi: "Hindi",
        ja: "Japanese",
        ko: "Korean",
        tr: "Turkish",
    };

    // Translations for each supported language
    const translations = {
        en: {
            recentSearches: "Recent Searches",
            favoriteLocations: "Favorite Locations",
            humidity: "Humidity",
            windSpeed: "Wind Speed",
            saveAsFavorite: "Save as Favorite",
            refresh: "Refresh",
            errorMessage: "An error occurred. Please try again.",
            networkError: "Network error occurred. Please check your internet connection.",
            showForecast: "Show Forecast",
            hideForecast: "Hide Forecast",
            searchPlaceholder: "Search for a city",
        },
        es: {
            recentSearches: "Búsquedas Recientes",
            favoriteLocations: "Ubicaciones Favoritas",
            humidity: "Humedad",
            windSpeed: "Velocidad del Viento",
            saveAsFavorite: "Guardar como Favorito",
            refresh: "Actualizar",
            errorMessage: "Ocurrió un error. Por favor intenta de nuevo.",
            networkError: "Ocurrió un error de red. Por favor, verifica tu conexión a Internet.",
            showForecast: "Mostrar Pronóstico",
            hideForecast: "Ocultar Pronóstico",
            searchPlaceholder: "Buscar una ciudad",
        },
        fr: {
            recentSearches: "Recherches Récentes",
            favoriteLocations: "Lieux Favoris",
            humidity: "Humidité",
            windSpeed: "Vitesse du Vent",
            saveAsFavorite: "Enregistrer comme Favori",
            refresh: "Rafraîchir",
            errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
            networkError: "Une erreur réseau est survenue. Veuillez vérifier votre connexion Internet.",
            showForecast: "Afficher les Prévisions",
            hideForecast: "Masquer les Prévisions",
            searchPlaceholder: "Rechercher une ville",
        },
        de: {
            recentSearches: "Kürzliche Suchen",
            favoriteLocations: "Lieblingsorte",
            humidity: "Luftfeuchtigkeit",
            windSpeed: "Windgeschwindigkeit",
            saveAsFavorite: "Als Favorit speichern",
            refresh: "Aktualisieren",
            errorMessage: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
            networkError: "Ein Netzwerkfehler ist aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung.",
            showForecast: "Vorhersage Anzeigen",
            hideForecast: "Vorhersage Ausblenden",
            searchPlaceholder: "Stadt suchen",
        },
        it: {
            recentSearches: "Ricerche Recenti",
            favoriteLocations: "Località Preferite",
            humidity: "Umidità",
            windSpeed: "Velocità del Vento",
            saveAsFavorite: "Salva come Preferito",
            refresh: "Aggiorna",
            errorMessage: "Si è verificato un errore. Riprova.",
            networkError: "Si è verificato un errore di rete. Controlla la tua connessione a Internet.",
            showForecast: "Mostra Previsioni",
            hideForecast: "Nascondi Previsioni",
            searchPlaceholder: "Cerca una città",
        },
        pt: {
            recentSearches: "Pesquisas Recentes",
            favoriteLocations: "Locais Favoritos",
            humidity: "Umidade",
            windSpeed: "Velocidade do Vento",
            saveAsFavorite: "Salvar como Favorito",
            refresh: "Atualizar",
            errorMessage: "Ocorreu um erro. Por favor, tente novamente.",
            networkError: "Ocorreu um erro de rede. Por favor, verifique sua conexão com a Internet.",
            showForecast: "Mostrar Previsão",
            hideForecast: "Ocultar Previsão",
            searchPlaceholder: "Pesquisar uma cidade",
        },
        ru: {
            recentSearches: "Недавние Поиски",
            favoriteLocations: "Избранные Места",
            humidity: "Влажность",
            windSpeed: "Скорость Ветра",
            saveAsFavorite: "Сохранить как Избранное",
            refresh: "Обновить",
            errorMessage: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
            networkError: "Произошла ошибка сети. Пожалуйста, проверьте ваше интернет-соединение.",
            showForecast: "Показать Прогноз",
            hideForecast: "Скрыть Прогноз",
            searchPlaceholder: "Поиск города",
        },
        ar: {
            recentSearches: "عمليات البحث الأخيرة",
            favoriteLocations: "الأماكن المفضلة",
            humidity: "الرطوبة",
            windSpeed: "سرعة الرياح",
            saveAsFavorite: "احفظ كمفضل",
            refresh: "تحديث",
            errorMessage: "حدث خطأ. يرجى المحاولة مرة أخرى.",
            networkError: "حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت.",
            showForecast: "عرض التوقعات",
            hideForecast: "إخفاء التوقعات",
            searchPlaceholder: "ابحث عن مدينة",
        },
        hi: {
            recentSearches: "हाल की खोजें",
            favoriteLocations: "पसंदीदा स्थान",
            humidity: "नमी",
            windSpeed: "हवा की गति",
            saveAsFavorite: "पसंदीदा के रूप में सहेजें",
            refresh: "ताज़ा करें",
            errorMessage: "एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
            networkError: "नेटवर्क त्रुटि हुई। कृपया अपने इंटरनेट कनेक्शन की जांच करें।",
            showForecast: "पूर्वानुमान दिखाएँ",
            hideForecast: "पूर्वानुमान छिपाएँ",
            searchPlaceholder: "शहर के लिए खोजें",
        },
        ja: {
            recentSearches: "最近の検索",
            favoriteLocations: "お気に入りの場所",
            humidity: "湿度",
            windSpeed: "風速",
            saveAsFavorite: "お気に入りとして保存",
            refresh: "更新",
            errorMessage: "エラーが発生しました。再試行してください。",
            networkError: "ネットワークエラーが発生しました。インターネット接続を確認してください。",
            showForecast: "予報を表示",
            hideForecast: "予報を隠す",
            searchPlaceholder: "都市を検索",
        },
        ko: {
            recentSearches: "최근 검색",
            favoriteLocations: "즐겨찾기 위치",
            humidity: "습도",
            windSpeed: "바람 속도",
            saveAsFavorite: "즐겨찾기로 저장",
            refresh: "새로 고침",
            errorMessage: "오류가 발생했습니다. 다시 시도하세요.",
            networkError: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
            showForecast: "예보 보기",
            hideForecast: "예보 숨기기",
            searchPlaceholder: "도시 검색",
        },
        tr: {
            recentSearches: "Son Aramalar",
            favoriteLocations: "Favori Lokasyonlar",
            humidity: "Nem",
            windSpeed: "Rüzgar Hızı",
            saveAsFavorite: "Favori Olarak Kaydet",
            refresh: "Yenile",
            errorMessage: "Bir hata oluştu. Lütfen tekrar deneyin.",
            networkError: "Ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin.",
            showForecast: "Tahmini Göster",
            hideForecast: "Tahmini Gizle",
            searchPlaceholder: "Bir şehir arayın",
        },
    };
 // ... (translation objects here)
    

    // Fetch recent searches and favorite locations on mount
    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
        setRecentSearches(storedSearches);
        setFavoriteLocations(storedFavorites);
        getCurrentLocation();

        // Handle clicks outside the sidebar to close it
        const handleClickOutside = (event) => {
            if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setShowSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSidebar]);

    const sidebarRef = useRef();

    // Get current location using Geolocation API
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoordinates(latitude, longitude);
                },
                () => {
                    setErrorMessage(translations[selectedLanguage].networkError);
                }
            );
        } else {
            setErrorMessage(translations[selectedLanguage].networkError);
        }
    };

    // Fetch weather data based on coordinates
    const fetchWeatherByCoordinates = async (lat, lon) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${selectedLanguage}&appid=${import.meta.env.VITE_APP_ID}`;
            const weatherResponse = await fetch(weatherUrl);

            // Check if the response is ok
            if (!weatherResponse.ok) {
                const errorData = await weatherResponse.json();
                const message = errorData.message || translations[selectedLanguage].errorMessage;
                setErrorMessage(`Error: ${message}`);
                return;
            }

            const weatherData = await weatherResponse.json();
            const iconCode = weatherData.weather[0].icon;
            const weatherCondition = weatherData.weather[0].main.toLowerCase(); 

            setBackgroundImage(getBackgroundImage(weatherCondition));

            // Set weather data to state
            setWeatherData({
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                temperature: Math.floor(weatherData.main.temp),
                location: weatherData.name,
                icon: allIcons[iconCode] || sun_icon,
                iconCode: iconCode
            });

            await fetchForecastData(lat, lon);
        } catch (error) {
            setErrorMessage(translations[selectedLanguage].networkError);
            console.error("Error in fetching weather data", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch forecast data for the location
    const fetchForecastData = async (lat, lon) => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_ID}&units=metric&lang=${selectedLanguage}`;
        const forecastResponse = await fetch(forecastUrl);

        // Check if the response is ok
        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json();
            const message = errorData.message || translations[selectedLanguage].errorMessage;
            setErrorMessage(`Error: ${message}`);
            return;
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.list);
        setIsFavorite(favoriteLocations.includes(weatherData.location));
        setErrorMessage('');
    };

    // Fetch weather data based on city name
    const fetchWeatherData = async (city) => {
        if (!city) return; // No city provided, exit early
        setIsLoading(true);
        setErrorMessage('');
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${selectedLanguage}&appid=${import.meta.env.VITE_APP_ID}`;
            const weatherResponse = await fetch(weatherUrl);

            // Check if the response is ok
            if (!weatherResponse.ok) {
                const errorData = await weatherResponse.json();
                const message = errorData.message || translations[selectedLanguage].errorMessage;
                setErrorMessage(`Error: ${message}`);
                return;
            }

            const weatherData = await weatherResponse.json();
            const iconCode = weatherData.weather[0].icon;
            const weatherCondition = weatherData.weather[0].main.toLowerCase(); 

            setBackgroundImage(getBackgroundImage(weatherCondition));

            // Set weather data to state
            setWeatherData({
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                temperature: Math.floor(weatherData.main.temp),
                location: weatherData.name,
                icon: allIcons[iconCode] || sun_icon,
                iconCode: iconCode
            });

            await fetchForecastDataByCity(city);
        } catch (error) {
            console.error("Network error occurred", error);
            setErrorMessage(translations[selectedLanguage].networkError);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch forecast data based on city name
    const fetchForecastDataByCity = async (city) => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric&lang=${selectedLanguage}`;
        const forecastResponse = await fetch(forecastUrl);

        // Check if the response is ok
        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json();
            const message = errorData.message || translations[selectedLanguage].errorMessage;
            setErrorMessage(`Error: ${message}`);
            return;
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.list);
        setIsFavorite(favoriteLocations.includes(weatherData.name));
        setErrorMessage('');
    };

    // Handle search action
    const search = async (city) => {
        if (city === "") {
            alert(translations[selectedLanguage].searchPlaceholder);
            return;
        }
        await fetchWeatherData(city);

        // Update recent searches in state and localStorage
        const updatedSearches = [city, ...recentSearches.filter(search => search !== city)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    // Save a location as favorite
    const saveFavoriteLocation = (location) => {
        // Use a Set to ensure unique favorites
        const updatedFavorites = [...new Set([...favoriteLocations, location])];
        setFavoriteLocations(updatedFavorites);
        localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
        setIsFavorite(true);
    };

    // Remove a location from favorites
    const removeFavoriteLocation = (location) => {
        const updatedFavorites = favoriteLocations.filter(fav => fav !== location);
        setFavoriteLocations(updatedFavorites);
        localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
    };

    const toggleSidebar = () => {
        setShowSidebar(prevState => !prevState);
    };

    const toggleForecast = () => {
        setShowForecast(prev => !prev);
        if (weatherData) {
            // Change text color based on temperature
            if (weatherData.temperature > 30) {
                setForecastTextColor('red');
            } else if (weatherData.temperature < 10) {
                setForecastTextColor('blue');
            } else {
                setForecastTextColor('green');
            }
        }
    };

    const handleRefresh = () => {
        if (weatherData) {
            fetchWeatherData(weatherData.location);
        }
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        if (weatherData) {
            fetchWeatherData(weatherData.location);
        }
    };

    // Get background image based on weather condition
    const getBackgroundImage = (condition) => {
        switch (condition) {
            case 'clear':
                return clearBackground;
            case 'clouds':
                return cloudyBackground;
            case 'rain':
                return rainyBackground;
            case 'snow':
                return snowyBackground;
            default:
                return defaultBackground; 
        }
    };

    return (
        <div 
            className='weather' 
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {isLoading && <div className="loading" aria-live="polite"></div>}
            <img 
                src={sidebar_icon} 
                alt="Toggle Sidebar" 
                className="sidebar-icon" 
                onClick={toggleSidebar} 
                role="button" 
                aria-label="Toggle Sidebar" 
            />
            
            {showSidebar && <div className="overlay" onClick={() => setShowSidebar(false)} aria-label="Close Sidebar"></div>}
            
            {showSidebar && (
                <div 
                    className={`sidebar open`} 
                    ref={sidebarRef} 
                    style={{ 
                        background: `url(${sidebarBackground}) no-repeat center center`, 
                        backgroundSize: 'cover', 
                        opacity: '0.9'
                    }}
                    aria-label="Sidebar with recent searches and favorite locations"
                >
                    <h3>{translations[selectedLanguage].recentSearches}</h3>
                    <div className="recent-searches">
                        {recentSearches.map((search, index) => (
                            <div 
                                key={index} 
                                onClick={() => { 
                                    inputRef.current.value = search; 
                                    search(search); 
                                    setShowSidebar(false); 
                                }} 
                                className="recent-search"
                                role="button"
                                aria-label={`Search for ${search}`}
                            >
                                {search}
                            </div>
                        ))}
                    </div>
                    <h3>{translations[selectedLanguage].favoriteLocations}</h3>
                    <div className="favorite-locations">
                        {favoriteLocations.map((location, index) => (
                            <div key={index} className="favorite-location">
                                {location}
                                <button 
                                    onClick={() => { 
                                        removeFavoriteLocation(location); 
                                        setShowSidebar(false); 
                                    }} 
                                    aria-label={`Remove ${location} from favorites`}
                                >
                                    {translations[selectedLanguage].saveAsFavorite}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SearchBar 
                search={search} 
                inputRef={inputRef} 
                handleLanguageChange={handleLanguageChange} 
                selectedLanguage={selectedLanguage} 
                supportedLanguages={supportedLanguages} 
            />
            <ErrorMessage errorMessage={errorMessage} />
            {weatherData && (
                <WeatherCard 
                    weatherData={weatherData} 
                    isFavorite={isFavorite} 
                    toggleFavorite={() => isFavorite ? removeFavoriteLocation(weatherData.location) : saveFavoriteLocation(weatherData.location)} 
                    handleRefresh={handleRefresh} 
                    translations={translations} 
                    selectedLanguage={selectedLanguage} 
                />
            )}
            {showForecast && (
                <div className="forecast" style={{ color: forecastTextColor }}>
                    {forecastData.map((item, index) => (
                        <div key={index} className="forecast-item">
                            <p>
                                {new Date(item.dt * 1000).toLocaleDateString()} 
                                {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <img src={allIcons[item.weather[0].icon] || sun_icon} alt="Forecast Icon" />
                            <p>{Math.floor(item.main.temp)}°C</p>
                        </div>
                    ))}
                </div>
            )}
            <button 
                className="toggle-forecast" 
                onClick={toggleForecast} 
                aria-label={showForecast ? translations[selectedLanguage].hideForecast : translations[selectedLanguage].showForecast}
            >
                {showForecast ? translations[selectedLanguage].hideForecast : translations[selectedLanguage].showForecast}
            </button>
        </div>
    );
};

export default Weather;
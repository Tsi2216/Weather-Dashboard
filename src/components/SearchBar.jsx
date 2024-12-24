import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // Function to save recent searches to local storage
  const saveRecentSearch = (city) => {
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!searches.includes(city)) {
      searches.push(city);
      localStorage.setItem('recentSearches', JSON.stringify(searches));
      setRecentSearches(searches); // Update state
    }
  };

  // Function to load recent searches from local storage
  const loadRecentSearches = () => {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
  };

  // Load recent searches on component mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await onSearch(city);
      saveRecentSearch(city); // Save city to recent searches
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
      setCity(''); // Clear the input field after search
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto md:rounded-l-md"
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200 md:rounded-r-md"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        {recentSearches.length > 0 && <h3 className="font-semibold">Recent Searches:</h3>}
        <ul className="list-disc pl-5">
          {recentSearches.map((recentCity, index) => (
            <li 
              key={index} 
              className="text-blue-600 cursor-pointer" 
              onClick={() => { 
                setCity(recentCity); 
                onSearch(recentCity); 
              }}
            >
              {recentCity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
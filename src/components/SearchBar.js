import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await onSearch(city);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
      setCity('');
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
    </div>
  );
};

export default SearchBar;
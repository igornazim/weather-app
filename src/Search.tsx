import React, { useEffect, useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { ForecastContext } from './contexts/index';
import './App.css';

const Search = () => {
  const contextData = useContext(ForecastContext);
  const [city, setCity] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    contextData?.setCity(city);
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        value={city}
        onChange={handleCityChange}
      >
      </input>
    </form>
  );
}

export default Search;

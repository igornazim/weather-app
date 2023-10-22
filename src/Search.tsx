import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';

const App = () => {
  const [temp, setTemp] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=london&appid=ada1ba65089546899569c283f09d47fb&units=metric');
        const roundedTemp = Math.round(data.main.temp);
        setTemp(roundedTemp);
        console.log(data.main.temp);
      } catch (err) {
        console.log(err)
        if (!(err instanceof AxiosError)) {
          return;
        } if (err.response && err.response.status === 401) {
          return;
        }
      }
    } 
    fetchWeatherData();
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className='temp-container'>
          <img className='weatherIcon' src={`${process.env.PUBLIC_URL}/cloudy.svg`} alt='cloudy' />
          <div className='temp-group'>
            <p className='temp'>
              {temp}
            </p>
            <sup>° C</sup>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

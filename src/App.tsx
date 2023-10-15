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
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          error => {
            console.error(`Ошибка: ${error.message}`);
          }
        );
        // const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ada1ba65089546899569c283f09d47fb&units=metric`);
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
          <p className='temp'>
            {temp}
          </p>
          <sup>° C</sup>
        </div>
      </header>
    </div>
  );
}

export default App;

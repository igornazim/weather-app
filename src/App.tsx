import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';

const App = () => {
  const [temp, setTemp] = useState(0);
  const [name, setName] = useState('london');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [skyState, setSky] = useState('')
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const today = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          error => {
            setLatitude(48.8566);
            setLongitude(2.3522);
            console.error(`Ошибка: ${error.message}`);
          }
        );
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ada1ba65089546899569c283f09d47fb&units=metric`);
        const roundedTemp = Math.round(data.main.temp);
        setTemp(roundedTemp);
        setName(data.name);
        setHumidity(data.main.humidity);
        setWind(Math.round(data.wind.speed));
        setSky(data.weather[0].description);
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
  }, [latitude, longitude]);

  return (
    <div className="App">
      <Header />
      <div className="left-column">
        <div className="temp-container">
          <div className="geo">
            <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/geo.svg`} alt='geo' />
            <p className="cityName">
              {name}
            </p>
          </div>
          <p className="current-data"> {formattedDate}</p>
          <div className="temp-group">
            <p className="temp">
              {temp}
            </p>
            <sup>°C</sup>
          </div>
          <div className="skyState">
            <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/cloudy.svg`} alt='cloudy' />
            <p>{skyState}</p>
          </div>
        </div>
        <div className="additional-panel">
          <div className="wind-group">
            <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/wind.svg`} alt='wind speed' />
            <p>Wind {wind} m/s</p>
          </div>
          <div className="humidity-group">
            <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/hum.svg`} alt='humidity is' />
            <p>Hum {humidity} %</p>
          </div>
        </div>
        <Cards />
      </div>
    </div>
  );
}

export default App;
